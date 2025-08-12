import { useState, useEffect, useRef } from 'react';
import { samplePromotionStrategy, simulateCheckUpdates } from '../sampleData';

export const useSampleData = () => {
  const [promotionStrategy, setPromotionStrategy] = useState(samplePromotionStrategy);
  const [currentPhase, setCurrentPhase] = useState<'development' | 'staging' | 'production' | 'production-failed'>('development');
  const [step, setStep] = useState(0);
  const { randomDelay } = simulateCheckUpdates();
  const timeoutRef = useRef<number | null>(null);
  const stepRef = useRef(0);
  const isStartedRef = useRef(false);

  // Clear any existing timeout
  const clearCurrentTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Schedule next step
  const scheduleNextStep = (callback: () => void) => {
    clearCurrentTimeout();
    const delay = Math.floor(Math.random() * 2000) + 3000; // 3-5 seconds for normal simulation
    console.log(`Scheduling next step in ${delay}ms (${(delay/1000).toFixed(1)}s)`);
    timeoutRef.current = setTimeout(callback, delay);
  };

  // Schedule next step with longer delay for rollback
  const scheduleRollbackStep = (callback: () => void) => {
    clearCurrentTimeout();
    const delay = Math.floor(Math.random() * 2000) + 3000; // 3-5 seconds for rollback
    console.log(`Scheduling rollback step in ${delay}ms (${(delay/1000).toFixed(1)}s)`);
    timeoutRef.current = setTimeout(callback, delay);
  };

  // Development phase simulation
  const simulateDevelopmentPhase = () => {
    const currentStep = stepRef.current;
    console.log(`Development step: ${currentStep}`);
    
    setPromotionStrategy(prev => {
      const updated = JSON.parse(JSON.stringify(prev));
      const dev = updated.status.environments[0];
      
      if (currentStep === 0) {
        console.log('Executing step 0: First proposed check success');
        // First proposed check success
        dev.proposed.commitStatuses[0].phase = 'success';
        dev.proposed.commitStatuses[0].details = 'Build completed successfully in 2m 15s';
        stepRef.current = 1;
        setStep(1);
        scheduleNextStep(simulateDevelopmentPhase);
      } else if (currentStep === 1) {
        console.log('Executing step 1: Second proposed check success');
        // Second proposed check success
        dev.proposed.commitStatuses[1].phase = 'success';
        dev.proposed.commitStatuses[1].details = 'All tests passed (47 tests, 0 failures)';
        stepRef.current = 2;
        setStep(2);
        scheduleNextStep(simulateDevelopmentPhase);
      } else if (currentStep === 2) {
        console.log('Executing step 2: All proposed checks passed, promoting proposed commit to active');
        // All proposed checks are now successful, promote proposed commit to active
        const proposedData = dev.proposed;
        dev.active = {
          dry: proposedData.dry,
          commitStatuses: dev.active.commitStatuses.map((check: any) => ({
            ...check,
            phase: 'pending',
            details: 'Check queued...'
          }))
        };
        // Don't set proposed to null yet - keep it visible for 2 seconds to showcase checkmarks
        stepRef.current = 3;
        setStep(3);
        // Add 2-second delay to showcase proposed cards with checkmarks before disappearing
        setTimeout(() => {
          // Now set proposed to null after the showcase period
          setPromotionStrategy(prev => {
            const updated = JSON.parse(JSON.stringify(prev));
            updated.status.environments[0].proposed = null;
            return updated;
          });
          scheduleNextStep(simulateDevelopmentPhase);
        }, 2000);
      } else if (currentStep === 3) {
        console.log('Executing step 3: First active check success');
        // First active check success
        dev.active.commitStatuses[0].phase = 'success';
        dev.active.commitStatuses[0].details = 'Build completed successfully in 2m 30s';
        stepRef.current = 4;
        setStep(4);
        scheduleNextStep(simulateDevelopmentPhase);
      } else if (currentStep === 4) {
        console.log('Executing step 4: Second active check success');
        // Second active check success
        dev.active.commitStatuses[1].phase = 'success';
        dev.active.commitStatuses[1].details = 'All tests passed (45 tests, 0 failures)';
        stepRef.current = 5;
        setStep(5);
        scheduleNextStep(simulateDevelopmentPhase);
      } else if (currentStep === 5) {
        console.log('Executing step 5: Third active check success');
        // Third active check success
        dev.active.commitStatuses[2].phase = 'success';
        dev.active.commitStatuses[2].details = 'Security scan completed - no vulnerabilities found';
        stepRef.current = 6;
        setStep(6);
        scheduleNextStep(() => {
          console.log('Moving to staging phase');
          setCurrentPhase('staging');
          stepRef.current = 0;
          setStep(0);
          simulateStagingPhase();
        });
      }
      
      return updated;
    });
  };

  // Staging phase simulation
  const simulateStagingPhase = () => {
    const currentStep = stepRef.current;
    console.log(`Staging step: ${currentStep}`);
    
    setPromotionStrategy(prev => {
      const updated = JSON.parse(JSON.stringify(prev));
      const staging = updated.status.environments[1];
      
      if (currentStep === 0) {
        console.log('Executing staging step 0: First proposed check success');
        // First proposed check success
        staging.proposed.commitStatuses[0].phase = 'success';
        staging.proposed.commitStatuses[0].details = 'Build completed successfully in 2m 45s';
        stepRef.current = 1;
        setStep(1);
        scheduleNextStep(simulateStagingPhase);
      } else if (currentStep === 1) {
        console.log('Executing staging step 1: Second proposed check success');
        // Second proposed check success
        staging.proposed.commitStatuses[1].phase = 'success';
        staging.proposed.commitStatuses[1].details = 'All tests passed (49 tests, 0 failures)';
        stepRef.current = 2;
        setStep(2);
        scheduleNextStep(simulateStagingPhase);
      } else if (currentStep === 2) {
        console.log('Executing staging step 2: All proposed checks passed, promoting proposed commit to active');
        // All proposed checks are now successful, promote proposed commit to active
        const proposedData = staging.proposed;
        staging.active = {
          dry: proposedData.dry,
          commitStatuses: staging.active.commitStatuses.map((check: any) => ({
            ...check,
            phase: 'pending',
            details: 'Check queued...'
          }))
        };
        // Don't set proposed to null yet - keep it visible for 2 seconds to showcase checkmarks
        stepRef.current = 3;
        setStep(3);
        // Add 2-second delay to showcase proposed cards with checkmarks before disappearing
        setTimeout(() => {
          // Now set proposed to null after the showcase period
          setPromotionStrategy(prev => {
            const updated = JSON.parse(JSON.stringify(prev));
            updated.status.environments[1].proposed = null;
            return updated;
          });
          scheduleNextStep(simulateStagingPhase);
        }, 2000);
      } else if (currentStep === 3) {
        console.log('Executing staging step 3: First active check success');
        // First active check success
        staging.active.commitStatuses[0].phase = 'success';
        staging.active.commitStatuses[0].details = 'Build completed successfully in 2m 45s';
        stepRef.current = 4;
        setStep(4);
        scheduleNextStep(simulateStagingPhase);
      } else if (currentStep === 4) {
        console.log('Executing staging step 4: Second active check success');
        // Second active check success
        staging.active.commitStatuses[1].phase = 'success';
        staging.active.commitStatuses[1].details = 'All tests passed (45 tests, 0 failures)';
        stepRef.current = 5;
        setStep(5);
        scheduleNextStep(simulateStagingPhase);
      } else if (currentStep === 5) {
        console.log('Executing staging step 5: Third active check success');
        // Third active check success
        staging.active.commitStatuses[2].phase = 'success';
        staging.active.commitStatuses[2].details = 'Security scan completed - no vulnerabilities found';
        stepRef.current = 6;
        setStep(6);
        scheduleNextStep(() => {
          console.log('Moving to production phase');
          setCurrentPhase('production');
          stepRef.current = 0;
          setStep(0);
          simulateProductionPhase();
        });
      }
      
      return updated;
    });
  };

  // Production phase simulation
  const simulateProductionPhase = () => {
    const currentStep = stepRef.current;
    console.log(`Production step: ${currentStep}`);
    
    setPromotionStrategy(prev => {
      const updated = JSON.parse(JSON.stringify(prev));
      const production = updated.status.environments[2];
      
      if (currentStep === 0) {
        console.log('Executing production step 0: First proposed check success');
        // First proposed check success
        production.proposed.commitStatuses[0].phase = 'success';
        production.proposed.commitStatuses[0].details = 'Build completed successfully in 2m 15s';
        stepRef.current = 1;
        setStep(1);
        scheduleNextStep(simulateProductionPhase);
      } else if (currentStep === 1) {
        console.log('Executing production step 1: Second proposed check FAILS');
        // Second proposed check FAILS
        production.proposed.commitStatuses[1].phase = 'failure';
        production.proposed.commitStatuses[1].details = 'Tests failed - 3 tests failing in auth.test.ts';
        stepRef.current = 2;
        setStep(2);
        scheduleNextStep(simulateProductionPhase);
      } else if (currentStep === 2) {
        console.log('Executing production step 2: Proposed checks failed, keeping proposed card visible');
        // Proposed checks failed, keep proposed card visible (don't hide it)
        // Reset active checks to pending
        production.active.commitStatuses.forEach((check: any) => {
          check.phase = 'pending';
          check.details = 'Check queued...';
        });
        stepRef.current = 3;
        setStep(3);
        scheduleNextStep(simulateProductionPhase);
      } else if (currentStep === 3) {
        console.log('Executing production step 3: First active check fails');
        // First active check fails
        production.active.commitStatuses[0].phase = 'failure';
        production.active.commitStatuses[0].details = 'Build failed - compilation errors in src/auth/jwt.ts';
        stepRef.current = 4;
        setStep(4);
        scheduleNextStep(simulateProductionPhase);
      } else if (currentStep === 4) {
        console.log('Executing production step 4: Second active check fails');
        // Second active check fails
        production.active.commitStatuses[1].phase = 'failure';
        production.active.commitStatuses[1].details = 'Tests failed - 3 tests failing in auth.test.ts';
        stepRef.current = 5;
        setStep(5);
        scheduleNextStep(simulateProductionPhase);
      } else if (currentStep === 5) {
        console.log('Executing production step 5: Third active check fails');
        // Third active check fails
        production.active.commitStatuses[2].phase = 'failure';
        production.active.commitStatuses[2].details = 'Security scan failed - critical vulnerability detected';
        stepRef.current = 6;
        setStep(6);
        console.log('Moving to production-failed phase');
        setCurrentPhase('production-failed');
      }
      
      return updated;
    });
  };

  // Special rollback simulation that always succeeds
  const simulateRollbackPhase = (environmentIndex: number) => {
    const currentStep = stepRef.current;
    console.log(`Rollback step: ${currentStep} for environment ${environmentIndex}`);
    
    setPromotionStrategy(prev => {
      const updated = JSON.parse(JSON.stringify(prev));
      const env = updated.status.environments[environmentIndex];
      
      if (currentStep === 0) {
        console.log('Executing rollback step 0: First proposed check success');
        // First proposed check success
        env.proposed.commitStatuses[0].phase = 'success';
        env.proposed.commitStatuses[0].details = 'Build completed successfully in 2m 15s';
        stepRef.current = 1;
        setStep(1);
        scheduleRollbackStep(() => simulateRollbackPhase(environmentIndex));
      } else if (currentStep === 1) {
        console.log('Executing rollback step 1: Second proposed check success');
        // Second proposed check success
        env.proposed.commitStatuses[1].phase = 'success';
        env.proposed.commitStatuses[1].details = 'All tests passed (47 tests, 0 failures)';
        stepRef.current = 2;
        setStep(2);
        scheduleRollbackStep(() => simulateRollbackPhase(environmentIndex));
      } else if (currentStep === 2) {
        console.log('Executing rollback step 2: Promoting rollback commit to active');
        // Promote rollback commit to active
        const proposedData = env.proposed;
        env.active = {
          dry: proposedData.dry,
          commitStatuses: env.active.commitStatuses.map((check: any) => ({
            ...check,
            phase: 'pending',
            details: 'Check queued...'
          }))
        };
        // Don't set proposed to null yet - keep it visible for 2 seconds to showcase checkmarks
        stepRef.current = 3;
        setStep(3);
        // Add 2-second delay to showcase proposed cards with checkmarks before disappearing
        setTimeout(() => {
          // Now set proposed to null after the showcase period
          setPromotionStrategy(prev => {
            const updated = JSON.parse(JSON.stringify(prev));
            updated.status.environments[environmentIndex].proposed = null;
            return updated;
          });
          scheduleRollbackStep(() => simulateRollbackPhase(environmentIndex));
        }, 2000);
      } else if (currentStep === 3) {
        console.log('Executing rollback step 3: First active check success');
        // First active check success
        env.active.commitStatuses[0].phase = 'success';
        env.active.commitStatuses[0].details = 'Build completed successfully in 2m 30s';
        stepRef.current = 4;
        setStep(4);
        scheduleRollbackStep(() => simulateRollbackPhase(environmentIndex));
      } else if (currentStep === 4) {
        console.log('Executing rollback step 4: Second active check success');
        // Second active check success
        env.active.commitStatuses[1].phase = 'success';
        env.active.commitStatuses[1].details = 'All tests passed (45 tests, 0 failures)';
        stepRef.current = 5;
        setStep(5);
        scheduleRollbackStep(() => simulateRollbackPhase(environmentIndex));
      } else if (currentStep === 5) {
        console.log('Executing rollback step 5: Third active check success');
        // Third active check success
        env.active.commitStatuses[2].phase = 'success';
        env.active.commitStatuses[2].details = 'Security scan completed - no vulnerabilities found';
        console.log('Rollback completed successfully');
      }
      
      return updated;
    });
  };

  // Start simulation when component mounts - using a different approach
  const initializeSimulation = () => {
    if (!isStartedRef.current) {
      console.log('Initializing simulation');
      isStartedRef.current = true;
      stepRef.current = 0;
      setStep(0);
      setCurrentPhase('development');
      // Use setTimeout to ensure state is set before starting simulation
      setTimeout(() => {
        simulateDevelopmentPhase();
      }, 0);
    }
  };

  // Call initialization immediately
  initializeSimulation();

  // Function to handle history click (simulate rollback)
  const handleHistoryClick = (environmentIndex: number, historyIndex: number) => {
    console.log(`Rollback triggered for environment ${environmentIndex}, history item ${historyIndex}`);
    
    setPromotionStrategy(prev => {
      const updated = JSON.parse(JSON.stringify(prev));
      const env = updated.status.environments[environmentIndex];
      const historyItem = env.history[historyIndex];
      
      // Set the history item as the proposed commit (simulate rollback)
      env.proposed = {
        dry: {
          ...historyItem.active.dry,
          author: "Shirley Huang <shirley@example.com>",
          body: "This commit was restored from history for rollback.\n\n" + (historyItem.active.dry.body || ""),
          repoURL: "https://github.com/example/sample-repo",
          references: [
            {
              commit: {
                ...historyItem.active.dry,
                author: "Shirley Huang <shirley@example.com>",
                date: historyItem.active.dry.commitTime,
                repoURL: "https://github.com/example/sample-repo"
              }
            }
          ]
        },
        commitStatuses: [
          {
            key: "build",
            phase: "pending",
            url: "https://github.com/example/sample-repo/actions/runs/rollback-build",
            details: "Build in progress..."
          },
          {
            key: "test",
            phase: "pending",
            url: "https://github.com/example/sample-repo/actions/runs/rollback-test",
            details: "Tests queued..."
          }
        ],
        pullRequest: {
          id: `rollback-${Date.now()}`,
          url: `https://github.com/example/sample-repo/pull/rollback-${Date.now()}`
        }
      };
      
      // Also update the active commit author to Shirley Huang
      env.active.dry.author = "Shirley Huang <shirley@example.com>";
      if (env.active.dry.references && env.active.dry.references[0] && env.active.dry.references[0].commit) {
        env.active.dry.references[0].commit.author = "Shirley Huang <shirley@example.com>";
      }
      
      return updated;
    });
    
    // Restart simulation for this environment
    const environmentName = ['development', 'staging', 'production'][environmentIndex];
    console.log(`Restarting rollback simulation for ${environmentName} environment`);
    
    // Reset simulation state for this environment
    stepRef.current = 0;
    setStep(0);
    
    // Start the rollback simulation (always succeeds)
    setTimeout(() => {
      simulateRollbackPhase(environmentIndex);
    }, 100);
  };

  return {
    promotionStrategy,
    currentPhase,
    step,
    handleHistoryClick
  };
}; 