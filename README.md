# Clocking System - George Wang

This application is made for the payroll challenge from Wave. Interface is developed using Angular, server side handling is using Express + MySQL.
Demo at http://siqiwang.me/himama

# Features
+ Allow users to log in with account or just name
+ Allow users to clock-in/out
+ Upon clock event, store clocking data
+ Clock in/out during day
+ Edit and delete timings

# Usage

App can be accessed directly from `./dist/index.html` locally

### Setup  Database Connection
                
1. Import database structure from `./db/himama.sql`

2. Setup database connection by changing `./api/config.js`
3. If port is different, change it in `./dist/index.html` :
```javascript
<script>
	var port = "5000";
	var api_endpoint = `http://localhost:${port}/api/v1/reports`;
</script>
```

4. Run `$npm install` and `$npm start` under `./api`
                
