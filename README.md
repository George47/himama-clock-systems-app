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

# Q&A

#### How did you approach this challenge

I chose Angular as front-end dashboard since it is my most comfortable framework. As for server side handler I chose express.js with connection to MySQL.

I chose to create a one-page two section dashboard to follow scope and add in my own interpretations to the best of my ability.

#### What schema design did you choose and why?

I chose to separate user data and timing data. Because it would have a clearer data fetching from server requests. Building services and pipes in Angular would easily improve the accessibility of data and improve scalability. 

#### If you were given another day to work on this, how would you spend it? What if you were given a month?

If I was given a day, I would focus on the core functionalities that is under the scope. (having a start/stop button that saves start time and records time difference)

If I was given given a month, I would look into improvements to database structure, algorithmic optimizations, and better layout/UX design.

Additionally I would look into the best way that the feature should be implemented to have the best experience. (e.g. adding annotation to daily tasks, having tags to represent what the breaks are for etc.)