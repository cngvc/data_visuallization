# JSON Data Seeding Documentation

## Overview

This document explains the JSON data seeding process in the Website Visualizations application. The seeding process uses Agenda, a job scheduling library, to import initial data from JSON files into the MongoDB database as a background task.

## Seed Data Implementation

### Architecture

The application uses a background job approach for data seeding with these components:

1. **Agenda Job Scheduler**: Manages the execution of the data seeding job
2. **Database Class**: Contains methods for database operations and job management
3. **ImportHistory Entity**: Tracks whether data has been imported previously
4. **JSON Data Files**: Source data stored in the `/app/data/JSON` directory

### Background Job Setup

The seeding process is executed as a background job using Agenda

### Job Scheduling

The job is scheduled to run immediately when the application starts

## Data Requirements

### Data Directory Structure

The JSON files must be placed in the `/app/data/JSON` directory. In Docker environments, this directory must be properly mapped as a volume:

```yaml
volumes:
  - ./data:/app/data
```

### File Format Requirements

The JSON files should follow these conventions:

1. Each file should contain an array of objects
2. Objects should match the schema of the target MongoDB collection
3. Files should be named according to their target collection

## Execution Flow

1. Application starts and establishes database connection
2. Agenda job scheduler is started
3. 'seed data' job is scheduled for immediate execution
4. Job executes the `seedJsonData` method
5. Method checks if data has already been imported
6. If no previous import, the `syncJsonData` function is called
7. JSON files are read, parsed, and imported into the database
8. Import history is recorded to prevent duplicate imports

## Troubleshooting

### Common Issues

#### Data Seeding Failures

**Issue**: Error: "ENOENT: no such file or directory, scandir '/app/data/JSON'"
**Solution**:

- Ensure the data directory is properly mapped in docker-compose.yml:
  ```yaml
  volumes:
    - ./data:/app/data
  ```
- Verify that JSON files exist in the local data/JSON directory

#### Job Timeout Issues

**Issue**: Jobs not completing or timing out
**Solution**:

- Increase the `lockLifetime` value in the job definition (default is 10000ms)
- For large datasets, consider splitting the import into smaller chunks

### Best Practices

1. **Idempotent Operations**: The seeding process is designed to run only once by checking the ImportHistory collection

2. **Error Handling**: All errors are logged and propagated to the calling job

3. **Docker Configuration**: Always map the data directory correctly in your Docker setup

4. **Data Validation**: Ensure your JSON files match the expected schema before deployment
