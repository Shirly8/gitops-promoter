// Sample data for GitOps Promoter UI testing
export const samplePromotionStrategy = {
  kind: "PromotionStrategy",
  apiVersion: "gitops.argoproj.io/v1alpha1",
  metadata: {
    name: "sample-promotion-strategy",
    namespace: "default",
    uid: "sample-uid-12345",
    resourceVersion: "12345",
    generation: 1,
    creationTimestamp: "2025-08-05T10:00:00Z",
    labels: {
      "app.kubernetes.io/name": "sample-app",
      "app.kubernetes.io/version": "v1.0.0"
    },
    annotations: {
      "gitops.argoproj.io/description": "Sample promotion strategy for testing"
    }
  },
  spec: {
    gitRepositoryRef: {
      name: "sample-repo",
      namespace: "default"
    },
    activeCommitStatuses: [
      { key: "build" },
      { key: "test" },
      { key: "security-scan" }
    ],
    proposedCommitStatuses: [
      { key: "build" },
      { key: "test" }
    ],
    environments: [
      {
        branch: "environments/development",
        autoMerge: false,
        activeCommitStatuses: [
          { key: "build" },
          { key: "test" },
          { key: "security-scan" }
        ],
        proposedCommitStatuses: [
          { key: "build" },
          { key: "test" }
        ]
      },
      {
        branch: "environments/staging",
        autoMerge: true,
        activeCommitStatuses: [
          { key: "build" },
          { key: "test" },
          { key: "security-scan" }
        ],
        proposedCommitStatuses: [
          { key: "build" },
          { key: "test" }
        ]
      },
      {
        branch: "environments/production",
        autoMerge: false,
        activeCommitStatuses: [
          { key: "build" },
          { key: "test" },
          { key: "security-scan" }
        ],
        proposedCommitStatuses: [
          { key: "build" },
          { key: "test" }
        ]
      }
    ]
  },
  status: {
    environments: [
      // Development Environment - STARTING POSITION
      {
        branch: "environments/development",
        active: {
          dry: {
            sha: "a1b2c3d4e5f6789012345678901234567890abcd",
            author: "Shuang <shuang@example.com>",
            subject: "feat: Add user authentication system",
            body: "This commit adds a comprehensive user authentication system with JWT tokens, password hashing, and role-based access control.\n\n- Implement JWT token generation and validation\n- Add bcrypt password hashing\n- Create role-based middleware\n- Add user registration and login endpoints\n\nCloses #123",
            commitTime: "2025-08-10T14:30:00Z",
            repoURL: "https://github.com/example/sample-repo",
            references: [
              {
                commit: {
                  sha: "f1e2d3c4b5a6789012345678901234567890efgh",
                  author: "Shuang <shuang@example.com>",
                  subject: "feat: Add user authentication system",
                  date: "2025-08-10T14:25:00Z",
                  body: "This commit adds a comprehensive user authentication system with JWT tokens, password hashing, and role-based access control.\n\n- Implement JWT token generation and validation\n- Add bcrypt password hashing\n- Create role-based middleware\n- Add user registration and login endpoints\n\nCloses #123",
                  repoURL: "https://github.com/example/sample-repo"
                }
              }
            ]
          },
          commitStatuses: [
            {
              key: "build",
              phase: "success",
              url: "https://github.com/example/sample-repo/actions/runs/123456",
              details: "Build completed successfully in 2m 30s"
            },
            {
              key: "test",
              phase: "success",
              url: "https://github.com/example/sample-repo/actions/runs/123457",
              details: "All tests passed (45 tests, 0 failures)"
            },
            {
              key: "security-scan",
              phase: "success",
              url: "https://github.com/example/sample-repo/actions/runs/123458",
              details: "Security scan completed - no vulnerabilities found"
            }
          ]
        },
        proposed: {
          dry: {
            sha: "b2c3d4e5f6789012345678901234567890abcde",
            author: "Shuang <shuang@example.com>",
            subject: "feat: Add payment processing integration",
            body: "This commit integrates Stripe payment processing into the application.\n\n- Add Stripe SDK and configuration\n- Implement payment intent creation\n- Add webhook handling for payment events\n- Create payment status tracking\n\nCloses #124",
            commitTime: "2025-08-11T09:15:00Z",
            repoURL: "https://github.com/example/sample-repo",
            references: [
              {
                commit: {
                  sha: "e2d3c4b5a6789012345678901234567890efghi",
                  author: "Shuang <shuang@example.com>",
                  subject: "feat: Add payment processing integration",
                  date: "2025-08-11T09:10:00Z",
                  body: "This commit integrates Stripe payment processing into the application.\n\n- Add Stripe SDK and configuration\n- Implement payment intent creation\n- Add webhook handling for payment events\n- Create payment status tracking\n\nCloses #124",
                  repoURL: "https://github.com/example/sample-repo"
                }
              }
            ]
          },
          commitStatuses: [
            {
              key: "build",
              phase: "pending",
              url: "https://github.com/example/sample-repo/actions/runs/123459",
              details: "Build in progress..."
            },
            {
              key: "test",
              phase: "pending",
              url: "https://github.com/example/sample-repo/actions/runs/123460",
              details: "Tests queued..."
            }
          ]
        },
        pullRequest: {
          id: "125",
          url: "https://github.com/example/sample-repo/pull/125"
        },
        history: [
          {
            active: {
              dry: {
                sha: "a1b2c3d4e5f6789012345678901234567890abcd",
                author: "Shuang <shuang@example.com>",
                subject: "feat: Add user authentication system",
                commitTime: "2025-08-10T14:30:00Z"
              }
            },
            proposed: {
              dry: {
                sha: "a1b2c3d4e5f6789012345678901234567890abcd",
                author: "Shuang <shuang@example.com>",
                subject: "feat: Add user authentication system",
                commitTime: "2025-08-10T14:30:00Z"
              }
            },
            pullRequest: {
              id: "123",
              url: "https://github.com/example/sample-repo/pull/123"
            }
          },
          {
            active: {
              dry: {
                sha: "c3d4e5f6789012345678901234567890abcdef",
                author: "Shuang <shuang@example.com>",
                subject: "feat: Add database migrations",
                commitTime: "2025-08-09T16:45:00Z"
              }
            },
            proposed: {
              dry: {
                sha: "c3d4e5f6789012345678901234567890abcdef",
                author: "Shuang <shuang@example.com>",
                subject: "feat: Add database migrations",
                commitTime: "2025-08-09T16:45:00Z"
              }
            },
            pullRequest: {
              id: "122",
              url: "https://github.com/example/sample-repo/pull/122"
            }
          },
          {
            active: {
              dry: {
                sha: "d4e5f6789012345678901234567890abcdef1",
                author: "Shuang <shuang@example.com>",
                subject: "feat: Add API documentation",
                commitTime: "2025-08-08T11:20:00Z"
              }
            },
            proposed: {
              dry: {
                sha: "d4e5f6789012345678901234567890abcdef1",
                author: "Shuang <shuang@example.com>",
                subject: "feat: Add API documentation",
                commitTime: "2025-08-08T11:20:00Z"
              }
            },
            pullRequest: {
              id: "121",
              url: "https://github.com/example/sample-repo/pull/121"
            }
          },
          {
            active: {
              dry: {
                sha: "e5f6789012345678901234567890abcdef12",
                author: "Shuang <shuang@example.com>",
                subject: "feat: Add logging system",
                commitTime: "2025-08-07T13:15:00Z"
              }
            },
            proposed: {
              dry: {
                sha: "e5f6789012345678901234567890abcdef12",
                author: "Shuang <shuang@example.com>",
                subject: "feat: Add logging system",
                commitTime: "2025-08-07T13:15:00Z"
              }
            },
            pullRequest: {
              id: "120",
              url: "https://github.com/example/sample-repo/pull/120"
            }
          },
          {
            active: {
              dry: {
                sha: "f6789012345678901234567890abcdef123",
                author: "Shuang <shuang@example.com>",
                subject: "feat: Add health check endpoints",
                commitTime: "2025-08-06T10:30:00Z"
              }
            },
            proposed: {
              dry: {
                sha: "f6789012345678901234567890abcdef123",
                author: "Shuang <shuang@example.com>",
                subject: "feat: Add health check endpoints",
                commitTime: "2025-08-06T10:30:00Z"
              }
            },
            pullRequest: {
              id: "119",
              url: "https://github.com/example/sample-repo/pull/119"
            }
          }
        ]
      },
      // Staging Environment - STARTING POSITION
      {
        branch: "environments/staging",
        active: {
          dry: {
            sha: "a1b2c3d4e5f6789012345678901234567890abcd",
            author: "Shuang <shuang@example.com>",
            subject: "feat: Add user authentication system",
            body: "This commit adds a comprehensive user authentication system with JWT tokens, password hashing, and role-based access control.\n\n- Implement JWT token generation and validation\n- Add bcrypt password hashing\n- Create role-based middleware\n- Add user registration and login endpoints\n\nCloses #123",
            commitTime: "2025-08-10T14:30:00Z",
            repoURL: "https://github.com/example/sample-repo",
            references: [
              {
                commit: {
                  sha: "f1e2d3c4b5a6789012345678901234567890efgh",
                  author: "Shuang <shuang@example.com>",
                  subject: "feat: Add user authentication system",
                  date: "2025-08-10T14:25:00Z",
                  body: "This commit adds a comprehensive user authentication system with JWT tokens, password hashing, and role-based access control.\n\n- Implement JWT token generation and validation\n- Add bcrypt password hashing\n- Create role-based middleware\n- Add user registration and login endpoints\n\nCloses #123",
                  repoURL: "https://github.com/example/sample-repo"
                }
              }
            ]
          },
          commitStatuses: [
            {
              key: "build",
              phase: "success",
              url: "https://github.com/example/sample-repo/actions/runs/123461",
              details: "Build completed successfully in 2m 45s"
            },
            {
              key: "test",
              phase: "success",
              url: "https://github.com/example/sample-repo/actions/runs/123462",
              details: "All tests passed (45 tests, 0 failures)"
            },
            {
              key: "security-scan",
              phase: "success",
              url: "https://github.com/example/sample-repo/actions/runs/123463",
              details: "Security scan completed - no vulnerabilities found"
            }
          ]
        },
        proposed: {
          dry: {
            sha: "b2c3d4e5f6789012345678901234567890abcde",
            author: "Shuang <shuang@example.com>",
            subject: "feat: Add payment processing integration",
            body: "This commit integrates Stripe payment processing into the application.\n\n- Add Stripe SDK and configuration\n- Implement payment intent creation\n- Add webhook handling for payment events\n- Create payment status tracking\n\nCloses #124",
            commitTime: "2025-08-11T09:15:00Z",
            repoURL: "https://github.com/example/sample-repo",
            references: [
              {
                commit: {
                  sha: "e2d3c4b5a6789012345678901234567890efghi",
                  author: "Shuang <shuang@example.com>",
                  subject: "feat: Add payment processing integration",
                  date: "2025-08-11T09:10:00Z",
                  body: "This commit integrates Stripe payment processing into the application.\n\n- Add Stripe SDK and configuration\n- Implement payment intent creation\n- Add webhook handling for payment events\n- Create payment status tracking\n\nCloses #124",
                  repoURL: "https://github.com/example/sample-repo"
                }
              }
            ]
          },
          commitStatuses: [
            {
              key: "build",
              phase: "pending",
              url: "https://github.com/example/sample-repo/actions/runs/123464",
              details: "Build in progress..."
            },
            {
              key: "test",
              phase: "pending",
              url: "https://github.com/example/sample-repo/actions/runs/123465",
              details: "Tests queued..."
            }
          ]
        },
        pullRequest: {
          id: "126",
          url: "https://github.com/example/sample-repo/pull/126"
        },
        history: [
          {
            active: {
              dry: {
                sha: "a1b2c3d4e5f6789012345678901234567890abcd",
                author: "Shuang <shuang@example.com>",
                subject: "feat: Add user authentication system",
                commitTime: "2025-08-10T14:30:00Z"
              }
            },
            proposed: {
              dry: {
                sha: "a1b2c3d4e5f6789012345678901234567890abcd",
                author: "Shuang <shuang@example.com>",
                subject: "feat: Add user authentication system",
                commitTime: "2025-08-10T14:30:00Z"
              }
            },
            pullRequest: {
              id: "123",
              url: "https://github.com/example/sample-repo/pull/123"
            }
          },
          {
            active: {
              dry: {
                sha: "c3d4e5f6789012345678901234567890abcdef",
                author: "Shuang <shuang@example.com>",
                subject: "feat: Add database migrations",
                commitTime: "2025-08-09T16:45:00Z"
              }
            },
            proposed: {
              dry: {
                sha: "c3d4e5f6789012345678901234567890abcdef",
                author: "Shuang <shuang@example.com>",
                subject: "feat: Add database migrations",
                commitTime: "2025-08-09T16:45:00Z"
              }
            },
            pullRequest: {
              id: "122",
              url: "https://github.com/example/sample-repo/pull/122"
            }
          },
          {
            active: {
              dry: {
                sha: "d4e5f6789012345678901234567890abcdef1",
                author: "Shuang <shuang@example.com>",
                subject: "feat: Add API documentation",
                commitTime: "2025-08-08T11:20:00Z"
              }
            },
            proposed: {
              dry: {
                sha: "d4e5f6789012345678901234567890abcdef1",
                author: "Shuang <shuang@example.com>",
                subject: "feat: Add API documentation",
                commitTime: "2025-08-08T11:20:00Z"
              }
            },
            pullRequest: {
              id: "121",
              url: "https://github.com/example/sample-repo/pull/121"
            }
          },
          {
            active: {
              dry: {
                sha: "e5f6789012345678901234567890abcdef12",
                author: "Shuang <shuang@example.com>",
                subject: "feat: Add logging system",
                commitTime: "2025-08-07T13:15:00Z"
              }
            },
            proposed: {
              dry: {
                sha: "e5f6789012345678901234567890abcdef12",
                author: "Shuang <shuang@example.com>",
                subject: "feat: Add logging system",
                commitTime: "2025-08-07T13:15:00Z"
              }
            },
            pullRequest: {
              id: "120",
              url: "https://github.com/example/sample-repo/pull/120"
            }
          },
          {
            active: {
              dry: {
                sha: "f6789012345678901234567890abcdef123",
                author: "Shuang <shuang@example.com>",
                subject: "feat: Add health check endpoints",
                commitTime: "2025-08-06T10:30:00Z"
              }
            },
            proposed: {
              dry: {
                sha: "f6789012345678901234567890abcdef123",
                author: "Shuang <shuang@example.com>",
                subject: "feat: Add health check endpoints",
                commitTime: "2025-08-06T10:30:00Z"
              }
            },
            pullRequest: {
              id: "119",
              url: "https://github.com/example/sample-repo/pull/119"
            }
          }
        ]
      },
      // Production Environment - STARTING POSITION
      {
        branch: "environments/production",
        active: {
          dry: {
            sha: "c3d4e5f6789012345678901234567890abcdef",
            author: "Shuang <shuang@example.com>",
            subject: "feat: Add database migrations",
            body: "This commit adds comprehensive database migration system with versioning and rollback capabilities.\n\n- Add migration framework\n- Implement version tracking\n- Add rollback functionality\n- Create migration CLI tools\n\nCloses #122",
            commitTime: "2025-08-09T16:45:00Z",
            repoURL: "https://github.com/example/sample-repo",
            references: [
              {
                commit: {
                  sha: "d3c4b5a6789012345678901234567890efghij",
                  author: "Shuang <shuang@example.com>",
                  subject: "feat: Add database migrations",
                  date: "2025-08-09T16:40:00Z",
                  body: "This commit adds comprehensive database migration system with versioning and rollback capabilities.\n\n- Add migration framework\n- Implement version tracking\n- Add rollback functionality\n- Create migration CLI tools\n\nCloses #122",
                  repoURL: "https://github.com/example/sample-repo"
                }
              }
            ]
          },
          commitStatuses: [
            {
              key: "build",
              phase: "success",
              url: "https://github.com/example/sample-repo/actions/runs/123466",
              details: "Build completed successfully in 2m 15s"
            },
            {
              key: "test",
              phase: "success",
              url: "https://github.com/example/sample-repo/actions/runs/123467",
              details: "All tests passed (43 tests, 0 failures)"
            },
            {
              key: "security-scan",
              phase: "success",
              url: "https://github.com/example/sample-repo/actions/runs/123468",
              details: "Security scan completed - no vulnerabilities found"
            }
          ]
        },
        proposed: {
          dry: {
            sha: "a1b2c3d4e5f6789012345678901234567890abcd",
            author: "Shuang <shuang@example.com>",
            subject: "feat: Add user authentication system",
            body: "This commit adds a comprehensive user authentication system with JWT tokens, password hashing, and role-based access control.\n\n- Implement JWT token generation and validation\n- Add bcrypt password hashing\n- Create role-based middleware\n- Add user registration and login endpoints\n\nCloses #123",
            commitTime: "2025-08-10T14:30:00Z",
            repoURL: "https://github.com/example/sample-repo",
            references: [
              {
                commit: {
                  sha: "f1e2d3c4b5a6789012345678901234567890efgh",
                  author: "Shuang <shuang@example.com>",
                  subject: "feat: Add user authentication system",
                  date: "2025-08-10T14:25:00Z",
                  body: "This commit adds a comprehensive user authentication system with JWT tokens, password hashing, and role-based access control.\n\n- Implement JWT token generation and validation\n- Add bcrypt password hashing\n- Create role-based middleware\n- Add user registration and login endpoints\n\nCloses #123",
                  repoURL: "https://github.com/example/sample-repo"
                }
              }
            ]
          },
          commitStatuses: [
            {
              key: "build",
              phase: "pending",
              url: "https://github.com/example/sample-repo/actions/runs/123469",
              details: "Build in progress..."
            },
            {
              key: "test",
              phase: "pending",
              url: "https://github.com/example/sample-repo/actions/runs/123470",
              details: "Tests queued..."
            }
          ]
        },
        pullRequest: {
          id: "127",
          url: "https://github.com/example/sample-repo/pull/127"
        },
        history: [
          {
            active: {
              dry: {
                sha: "c3d4e5f6789012345678901234567890abcdef",
                author: "Shuang <shuang@example.com>",
                subject: "feat: Add database migrations",
                commitTime: "2025-08-09T16:45:00Z"
              }
            },
            proposed: {
              dry: {
                sha: "c3d4e5f6789012345678901234567890abcdef",
                author: "Shuang <shuang@example.com>",
                subject: "feat: Add database migrations",
                commitTime: "2025-08-09T16:45:00Z"
              }
            },
            pullRequest: {
              id: "122",
              url: "https://github.com/example/sample-repo/pull/122"
            }
          },
          {
            active: {
              dry: {
                sha: "d4e5f6789012345678901234567890abcdef1",
                author: "Shuang <shuang@example.com>",
                subject: "feat: Add API documentation",
                commitTime: "2025-08-08T11:20:00Z"
              }
            },
            proposed: {
              dry: {
                sha: "d4e5f6789012345678901234567890abcdef1",
                author: "Shuang <shuang@example.com>",
                subject: "feat: Add API documentation",
                commitTime: "2025-08-08T11:20:00Z"
              }
            },
            pullRequest: {
              id: "121",
              url: "https://github.com/example/sample-repo/pull/121"
            }
          },
          {
            active: {
              dry: {
                sha: "e5f6789012345678901234567890abcdef12",
                author: "Shuang <shuang@example.com>",
                subject: "feat: Add logging system",
                commitTime: "2025-08-07T13:15:00Z"
              }
            },
            proposed: {
              dry: {
                sha: "e5f6789012345678901234567890abcdef12",
                author: "Shuang <shuang@example.com>",
                subject: "feat: Add logging system",
                commitTime: "2025-08-07T13:15:00Z"
              }
            },
            pullRequest: {
              id: "120",
              url: "https://github.com/example/sample-repo/pull/120"
            }
          },
          {
            active: {
              dry: {
                sha: "f6789012345678901234567890abcdef123",
                author: "Shuang <shuang@example.com>",
                subject: "feat: Add health check endpoints",
                commitTime: "2025-08-06T10:30:00Z"
              }
            },
            proposed: {
              dry: {
                sha: "f6789012345678901234567890abcdef123",
                author: "Shuang <shuang@example.com>",
                subject: "feat: Add health check endpoints",
                commitTime: "2025-08-06T10:30:00Z"
              }
            },
            pullRequest: {
              id: "119",
              url: "https://github.com/example/sample-repo/pull/119"
            }
          },
          {
            active: {
              dry: {
                sha: "g7890123456789012345678901234567890abcde",
                author: "Shuang <shuang@example.com>",
                subject: "feat: Add monitoring dashboard",
                commitTime: "2025-08-05T09:00:00Z"
              }
            },
            proposed: {
              dry: {
                sha: "g7890123456789012345678901234567890abcde",
                author: "Shuang <shuang@example.com>",
                subject: "feat: Add monitoring dashboard",
                commitTime: "2025-08-05T09:00:00Z"
              }
            },
            pullRequest: {
              id: "118",
              url: "https://github.com/example/sample-repo/pull/118"
            }
          }
        ]
      }
    ]
  }
};

// Function to simulate check status changes
export const simulateCheckUpdates = () => {
  const checkPhases = ['pending', 'running', 'success', 'failure'];
  const randomPhase = () => checkPhases[Math.floor(Math.random() * checkPhases.length)];
  
  // Simulate 4-8 second delays for check updates
  const randomDelay = () => Math.floor(Math.random() * 4000) + 4000; // 4-8 seconds
  
  return {
    randomPhase,
    randomDelay
  };
}; 