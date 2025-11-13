module.exports = {
  apps: [
    {
      name: 'app',
      script: './build/src/app.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      output: '/dev/null',
      error: '/dev/null',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      ignore_watch: ['node_modules', 'logs', '.git', '*.log', '*.log.*', '*.log.*.gz']
    }
  ]
};
