// Course content: D = days, L = lessons, G = glossary
window.DATA = {
 "D": [
  [
   "What is Express.js?",
   "Frontend vs backend, Node, request/response",
   "Create the server"
  ],
  [
   "Creating an Express server",
   "npm, package.json, port, nodemon",
   "Run it with nodemon"
  ],
  [
   "Routes",
   "Paths, handlers, route order, 404s, params",
   "Add GET /tasks and GET /tasks/:id"
  ],
  [
   "HTTP methods",
   "GET, POST, PUT, PATCH, DELETE",
   "Add POST, PUT, PATCH, DELETE"
  ],
  [
   "Request and response",
   "req, res, send, json, status",
   "Return proper status codes"
  ],
  [
   "Params, query and body",
   "req.params, req.query, req.body",
   "Filter and create tasks"
  ],
  [
   "Week 1 review + mini API",
   "Combine everything",
   "Mini API and assessment"
  ],
  [
   "Middleware",
   "next(), request journey",
   "Add a logger"
  ],
  [
   "Built-in middleware",
   "express.json(), static files",
   "Parse JSON bodies"
  ],
  [
   "Custom middleware",
   "Logger, timer, fake auth, modifying req",
   "Add timer and fake auth"
  ],
  [
   "Express Router",
   "express.Router(), route files",
   "Split routes into files"
  ],
  [
   "Controllers",
   "Separating responsibilities",
   "Move handlers to controllers"
  ],
  [
   "REST + CRUD",
   "Naming, status codes",
   "Full tasks resource"
  ],
  [
   "Week 2 project",
   "Router + controllers + REST",
   "Build the API yourself"
  ],
  [
   "Error handling",
   "try/catch, error middleware",
   "Central error handler"
  ],
  [
   "Validation",
   "Untrusted input, required fields",
   "Validate task input"
  ],
  [
   "Environment variables",
   ".env, process.env, .gitignore",
   "Configure port and secrets"
  ],
  [
   "Async Express",
   "Promises, async/await",
   "Async data layer"
  ],
  [
   "Project structure",
   "routes, controllers, services, config",
   "Refactor the project"
  ],
  [
   "Complete REST API",
   "Requirements only, hints on request",
   "Build the API"
  ],
  [
   "Final project + assessment",
   "Everything, then What You Can Now Do",
   "Ship the final API"
  ]
 ],
 "L": {
  "1": {
   "s": [
    [
     "What are we learning?",
     "<p>Picture a restaurant. You (the <b>client</b>) place an order. The kitchen (the <b>server</b>) prepares it and sends back a dish. Websites and apps work the same way: the client sends a <b>request</b>, the server sends a <b>response</b>.</p>\n<div class=\"lv\"><b>Simple.</b> Express is a toolkit that helps you build the kitchen.</div>\n<div class=\"lv\"><b>Developer.</b> Express is a library for Node.js. You describe which requests your server accepts and what it replies.</div>\n<div class=\"lv\"><b>Technical.</b> Express is a minimal web framework that wraps Node's built-in <code>http</code> module with routing and middleware.</div>\n<p>Frontend is what users see (buttons, pages). Backend is the code on a server that stores data, enforces rules and answers requests. A browser is one kind of client; a phone app is another.</p>"
    ],
    [
     "Why does Express exist?",
     "<p><b>Node.js</b> lets JavaScript run outside the browser, so you can write servers in JavaScript. But Node alone is low level. You must inspect every URL and method by hand:</p>\n<pre><code>const http = require(\"http\");\nhttp.createServer((req, res) => {\n  if (req.method === \"GET\" &amp;&amp; req.url === \"/\") {\n    res.writeHead(200, {\"Content-Type\": \"text/plain\"});\n    res.end(\"Hello\");\n  } else { res.writeHead(404); res.end(\"Not found\"); }\n}).listen(3000);</code></pre>\n<p>Express does the same with far less code, and it scales better as the app grows:</p>\n<pre><code>app.get(\"/\", (req, res) => res.send(\"Hello\"));</code></pre>\n<p><b>Without it:</b> long if/else chains, manual headers, manual body parsing. <b>Node vs Express:</b> Node runs your code and talks to the network. Express organizes how your code reacts to requests.</p>"
    ],
    [
     "Mental model",
     "<pre>CLIENT  --GET /tasks-->  EXPRESS SERVER\n                           |\n                         ROUTE (method + path match)\n                           |\n                         ROUTE HANDLER (your function)\n                           |\nCLIENT  &lt;--response------  res.json(...)</pre>\n<p>One request in, one response out. If you never send a response, the client waits until it times out.</p>"
    ],
    [
     "Build it step by step",
     "<h4>Step 1: import and create the app</h4>\n<pre><code>const express = require(\"express\");\nconst app = express();</code></pre>\n<p><code>require</code> loads a module (a file or package of code). <code>express()</code> is a function that returns an <code>app</code> object: your server's control panel.</p>\n<h4>Step 2: add a route</h4>\n<pre><code>app.get(\"/\", (req, res) => {\n  res.send(\"Hello\");\n});</code></pre>\n<p><code>.get()</code> says: when a <b>GET</b> request arrives for the path <code>\"/\"</code>, run this function. The path is in quotes because it is a string. The function is a <b>callback</b>: you hand it to Express and Express calls it later, each time a matching request arrives. Express creates <code>req</code> (an object describing the request) and <code>res</code> (an object with methods to reply), and passes both in. If nobody visits <code>/</code>, the function never runs.</p>\n<h4>Step 3: listen</h4>\n<pre><code>app.listen(3000, () => console.log(\"Running on port 3000\"));</code></pre>\n<p>Defining routes does nothing until the server listens on a <b>port</b>, a numbered door on your computer. Now <code>http://localhost:3000/</code> shows \"Hello\".</p>\n<h4>Step 4: put it together</h4>\n<pre><code>const express = require(\"express\");\nconst app = express();\napp.get(\"/\", (req, res) => res.send(\"Hello\"));\napp.listen(3000);</code></pre>"
    ],
    [
     "Common beginner mistakes",
     "<div class=\"lv bad\"><b>No listen.</b> The file runs and exits. Nothing is serving requests.</div>\n<div class=\"lv bad\"><b>Wrong path.</b> Visiting <code>/about</code> when only <code>/</code> exists gives <code>Cannot GET /about</code>. Express found no matching route, so it replies with a 404.</div>\n<div class=\"lv bad\"><b>Missing bracket.</b> A missing <code>}</code> or <code>)</code> gives a SyntaxError that points near, not always at, the real mistake. Find the opening bracket, then look for its partner.</div>\n<div class=\"lv bad\"><b>No response.</b> A handler that never calls <code>res.send</code> or <code>res.json</code> leaves the browser loading forever.</div>"
    ]
   ],
   "fill": {
    "code": "const express = require(\"express\");\nconst app = express();\napp.___(\"/\", (req, res) => {\n  res.___(\"Hello\");\n});\napp.listen(3000);",
    "a": [
     "get",
     "send"
    ]
   },
   "q": [
    {
     "c": "Routes",
     "q": "A server has only app.get(\"/hi\", (req,res)=>res.send(\"Hello\")). What does a browser see when it visits /hi?",
     "o": [
      "Cannot GET /hi",
      "Hello",
      "Nothing, it hangs",
      "A JSON object"
     ],
     "a": 1,
     "e": "The method (GET) and path (/hi) match, so the handler runs and sends the text Hello."
    },
    {
     "c": "Request/response",
     "q": "The same server gets a request for /about. What happens?",
     "o": [
      "Hello",
      "Express crashes",
      "A 404: Cannot GET /about",
      "The server restarts"
     ],
     "a": 2,
     "e": "No route matches /about, so Express sends its default 404 response."
    },
    {
     "c": "app.listen",
     "q": "Your file defines routes but nothing responds at localhost:3000. What is the most likely bug?",
     "o": [
      "Missing app.listen()",
      "Wrong quotes",
      "Too many routes",
      "Missing require"
     ],
     "a": 0,
     "e": "Without listen, the server never opens a port."
    },
    {
     "c": "Node vs Express",
     "q": "Which statement is correct?",
     "o": [
      "Express replaces Node",
      "Express runs on top of Node and simplifies routing",
      "Node is only for browsers",
      "Express is a database"
     ],
     "a": 1,
     "e": "Express is a library built on Node's http module."
    },
    {
     "c": "Callbacks",
     "q": "Who creates req and res and passes them to your handler?",
     "o": [
      "You, at the top of the file",
      "The browser",
      "Express, when a request arrives",
      "npm"
     ],
     "a": 2,
     "e": "You write the function; Express calls it with fresh req and res for each request."
    }
   ],
   "ch": "Build a server with GET / (text reply) and GET /tasks (reply with a JSON message such as {message:\"Tasks\"} using res.json). Run it and test both URLs plus one wrong one. This is Task Management API v1.",
   "rf": "Why does the server need app.listen()? Explain in your own words."
  },
  "2": {
   "s": [
    [
     "Why do we need npm?",
     "<p>Nobody writes everything from scratch. Other developers publish reusable code called <b>packages</b>, such as Express. Before package managers you downloaded files by hand, copied them into your project and hoped the versions matched. <b>npm</b> (Node Package Manager) installs a package and everything it depends on with one command, and records what you used so anyone can rebuild the same setup.</p><div class=\"lv\"><b>Simple.</b> npm is an app store for code. <b>In our project.</b> It gives us Express and nodemon. <b>Technical.</b> npm is a package manager and registry client that resolves a dependency tree and writes it into node_modules.</div>"
    ],
    [
     "Mental model: what is in the folder",
     "<pre>task-api/\n  server.js           your code\n  package.json        what the project is and needs\n  package-lock.json   exact versions installed\n  node_modules/       the downloaded packages (never edit)</pre>"
    ],
    [
     "npm and package.json",
     "<p><b>npm</b> (Node Package Manager) downloads code other developers published. <code>npm init -y</code> creates <code>package.json</code>, your project's ID card: name, scripts, and <b>dependencies</b> (packages your project needs).</p>\n<pre><code>npm init -y\nnpm install express</code></pre>\n<p>The install creates a <code>node_modules</code> folder (the downloaded code, never edit or commit it) and lists express under dependencies. Anyone can later run <code>npm install</code> to rebuild it.</p>"
    ],
    [
     "Running and restarting",
     "<p><code>node server.js</code> starts your file. Node does not notice file changes, so you restart by hand. <b>nodemon</b> restarts automatically:</p>\n<pre><code>npm install --save-dev nodemon\n// package.json\n\"scripts\": { \"dev\": \"nodemon server.js\" }\nnpm run dev</code></pre>\n<p><code>localhost</code> means \"this computer\". The port picks which program on it receives the request.</p>"
    ],
    [
     "Reading startup errors",
     "<div class=\"lv bad\"><b>EADDRINUSE</b> means another program already uses that port. Stop it or change the port.</div>\n<div class=\"lv bad\"><b>Cannot find module 'express'</b> means you have not installed it, or you are in the wrong folder.</div>\n<p>Read terminal errors from the top: the first line names the problem, the next lines name the file and line number.</p>"
    ],
    [
     "Build it step by step",
     "<h4>Step 1: make a project folder</h4><pre><code>mkdir task-api\ncd task-api</code></pre><p>mkdir makes a folder, cd moves into it. Every later command runs from inside this folder.</p><h4>Step 2: create package.json</h4><pre><code>npm init -y</code></pre><p>-y accepts the defaults. The file records the name, version and scripts of your project.</p><h4>Step 3: install Express</h4><pre><code>npm install express</code></pre><p>npm contacts the registry, downloads Express and the packages it needs into node_modules, adds express to the <b>dependencies</b> list in package.json and fixes exact versions in package-lock.json. A <b>dependency</b> is a package your code needs in order to run.</p><h4>Step 4: write server.js</h4><pre><code>const express = require(\"express\");\nconst app = express();\napp.get(\"/\", (req, res) => res.send(\"Hello\"));\napp.listen(3000, () => console.log(\"Server running on http://localhost:3000\"));</code></pre><h4>Step 5: run it</h4><pre><code>node server.js</code></pre><p>Node reads the file, runs it top to bottom, and keeps running because app.listen holds a port open. <b>localhost</b> is the name for your own computer. <b>3000</b> is the port. Open http://localhost:3000. Stop the server with Ctrl+C.</p>"
    ],
    [
     "Development workflow with nodemon",
     "<p>Node reads your file once. Edit it and nothing changes until you restart. <b>nodemon</b> watches your files and restarts for you. Install it as a <b>devDependency</b>, because it is only for development.</p><pre><code>npm install --save-dev nodemon\n\"scripts\": { \"start\": \"node server.js\", \"dev\": \"nodemon server.js\" }\nnpm run dev</code></pre><p>Scripts in package.json are named shortcuts. npm run dev runs whatever \"dev\" says.</p>"
    ],
    [
     "Reading terminal errors",
     "<div class=\"lv bad\"><b>Cannot find module 'express'.</b> It is not installed here. You are in the wrong folder, or you skipped npm install.</div><div class=\"lv bad\"><b>EADDRINUSE: port 3000 already in use.</b> Another copy of your server is still running. Stop it with Ctrl+C or choose a different port.</div><div class=\"lv bad\"><b>SyntaxError: Unexpected token.</b> A bracket, quote or comma is wrong. The line number shown may be just after the real mistake, so check the line above.</div><div class=\"lv bad\"><b>ReferenceError: app is not defined.</b> A name is used before it is created, or is misspelled.</div><p>Method: read the first line for the error type, then the first file path with a line number, and open that line.</p>"
    ]
   ],
   "fill": {
    "code": "npm ___ express\nnode ___.js",
    "a": [
     "install",
     "server"
    ]
   },
   "q": [
    {
     "c": "npm",
     "q": "You get 'Cannot find module express'. What do you check first?",
     "o": [
      "Your internet speed",
      "That you ran npm install express in this project folder",
      "The port number",
      "nodemon"
     ],
     "a": 1,
     "e": "The module must exist in this project's node_modules."
    },
    {
     "c": "package.json",
     "q": "What is package.json for?",
     "o": [
      "Storing user data",
      "Describing the project, its scripts and dependencies",
      "Running the server",
      "Styling"
     ],
     "a": 1,
     "e": "It is the project's manifest."
    },
    {
     "c": "Ports",
     "q": "You see EADDRINUSE. What happened?",
     "o": [
      "Port is already used",
      "Express is missing",
      "Syntax error",
      "Wrong URL"
     ],
     "a": 0,
     "e": "Another process holds that port."
    },
    {
     "c": "nodemon",
     "q": "Why use nodemon during development?",
     "o": [
      "It makes code faster",
      "It restarts the server when files change",
      "It installs Express",
      "It hides errors"
     ],
     "a": 1,
     "e": "No more manual restarts."
    },
    {
     "c": "npm",
     "q": "You clone a project that has package.json but no node_modules. What do you run?",
     "o": [
      "npm install",
      "node_modules",
      "npm start"
     ],
     "a": 0,
     "e": "npm install reads package.json and downloads everything it lists."
    }
   ],
   "ch": "Create a new folder, initialise npm, install Express and nodemon, add a dev script, and run your Day 1 server with npm run dev. Change the reply text and confirm it restarts.",
   "rf": "What is the difference between node server.js and npm run dev?"
  },
  "3": {
   "s": [
    [
     "Why do routes exist?",
     "<p>A server receives thousands of different requests. It needs a way to decide which code answers which request. A <b>route</b> is that rule: when a request arrives with this <b>method</b> and this <b>path</b>, run this <b>handler</b>. Without routes you would write one giant function full of if statements, as in the plain Node example from Day 1.</p><pre>Incoming: GET /tasks\n  route 1: GET /           no match\n  route 2: GET /tasks      match, run handler\n  route 3: GET /tasks/:id  never checked</pre><p>Express checks routes in the order you wrote them and stops at the first match. A <b>handler</b> is the function that runs, and (req, res) => {} is a <b>callback</b> because Express calls it for you.</p>"
    ],
    [
     "What is a route?",
     "<p>A <b>route</b> = HTTP method + path + handler. Express checks routes from top to bottom and runs the first that matches.</p>\n<pre><code>app.get(\"/tasks\", (req, res) => res.json([]));\napp.get(\"/about\", (req, res) => res.send(\"About\"));</code></pre>"
    ],
    [
     "Route parameters",
     "<pre><code>app.get(\"/tasks/:id\", (req, res) => {\n  res.json({ id: req.params.id });\n});</code></pre>\n<div class=\"lv\"><b>Simple.</b> In /tasks/25 the 25 says which task you want.</div>\n<div class=\"lv\"><b>Technical.</b> <code>req</code> is an object, <code>params</code> is a property on it holding every named segment, and <code>id</code> is one of them. Values are always strings.</div>"
    ],
    [
     "Route order and 404s",
     "<p>Put specific routes before general ones. If nothing matches, add a catch-all last:</p>\n<pre><code>app.use((req, res) => res.status(404).json({ message: \"Not found\" }));</code></pre>\n<div class=\"lv bad\"><b>Mistake.</b> Writing <code>req.param.id</code> (missing s) gives an error because <code>req.param</code> is not the params object.</div>"
    ],
    [
     "Routing, one stage at a time",
     "<h4>Stage 1 and 2: several fixed routes</h4><pre><code>app.get(\"/\", (req, res) => res.send(\"Home\"));\napp.get(\"/tasks\", (req, res) => res.json(tasks));\napp.get(\"/about\", (req, res) => res.send(\"About\"));</code></pre><h4>Stage 3: one parameter</h4><pre><code>app.get(\"/tasks/:id\", (req, res) => res.json({ id: req.params.id }));</code></pre><p>:id is a placeholder. /tasks/7 and /tasks/hello both match.</p><h4>Stage 4: more than one parameter</h4><pre><code>app.get(\"/users/:userId/tasks/:taskId\", (req, res) => {\n  res.json(req.params);   // { userId: \"3\", taskId: \"9\" }\n});</code></pre><h4>Stage 5 and 6: query and params together</h4><pre><code>app.get(\"/users/:userId/tasks\", (req, res) => {\n  res.json({ user: req.params.userId, done: req.query.done });\n});\n// GET /users/3/tasks?done=true</code></pre><p>The path picks the user, the query filters. The query is not part of route matching, so /tasks?done=true still matches app.get(\"/tasks\").</p><h4>Stage 7: the preview of routers</h4><p>As routes multiply you will group them in separate files with express.Router (Day 11). For now keep them in server.js.</p>"
    ],
    [
     "Route order, in practice",
     "<pre><code>app.get(\"/tasks/:id\", (req, res) => res.send(\"one task\"));\napp.get(\"/tasks/new\", (req, res) => res.send(\"new form\"));</code></pre><p>GET /tasks/new matches the first route, with id equal to \"new\". The second route is never reached. Put specific routes before parameter routes.</p>"
    ],
    [
     "Common mistakes",
     "<div class=\"lv bad\"><b>Typo in the URL.</b> Visiting /task when the route is /tasks gives Cannot GET /task.</div><div class=\"lv bad\"><b>Wrong method.</b> A browser sends GET. A route written with app.post will not answer it.</div><div class=\"lv bad\"><b>Missing slash or colon.</b> app.get(\"tasks/:id\") and app.get(\"/tasks/id\") do not behave as intended.</div><div class=\"lv bad\"><b>Wrong order.</b> A general route placed above a specific one hides it.</div><div class=\"lv bad\"><b>No response.</b> A handler that never calls res.send or res.json leaves the request hanging.</div>"
    ]
   ],
   "fill": {
    "code": "app.get(\"/tasks/:___\", (req, res) => {\n  res.json({ id: req.___.id });\n});",
    "a": [
     "id",
     "params"
    ]
   },
   "q": [
    {
     "c": "req.params",
     "q": "For app.get(\"/tasks/:id\") and a request to /tasks/7, what is req.params.id?",
     "o": [
      "7 (as a string)",
      "7 (as a number)",
      "undefined",
      "tasks"
     ],
     "a": 0,
     "e": "Params are strings."
    },
    {
     "c": "Route order",
     "q": "Two routes both match a URL. Which runs?",
     "o": [
      "The last one",
      "The first one defined",
      "Both",
      "Neither"
     ],
     "a": 1,
     "e": "Express runs the first match."
    },
    {
     "c": "404",
     "q": "Where should a catch-all 404 handler go?",
     "o": [
      "First",
      "Last, after all routes",
      "Anywhere",
      "Inside a route"
     ],
     "a": 1,
     "e": "Otherwise it would catch everything."
    },
    {
     "c": "Routes",
     "q": "What three things define a route?",
     "o": [
      "Method, path, handler",
      "Port, host, file",
      "Name, color, id",
      "req, res, next"
     ],
     "a": 0,
     "e": "Method + path + handler."
    },
    {
     "c": "req.params",
     "q": "Two routes are defined in this order: app.get('/tasks/:id') then app.get('/tasks/new'). What does GET /tasks/new run?",
     "o": [
      "Both",
      "The /tasks/:id handler, with id equal to 'new'",
      "The /tasks/new handler"
     ],
     "a": 1,
     "e": "The first matching route wins, and :id matches any segment."
    }
   ],
   "ch": "Add GET /tasks (array of 3 tasks) and GET /tasks/:id that returns one task or a 404 JSON message if the id does not exist.",
   "rf": "Why did we use req.params instead of putting the id in the body?"
  },
  "4": {
   "s": [
    [
     "Why do methods exist?",
     "<p>Without methods, every action needs its own URL: /getTasks, /addTask, /removeTask. Methods let one URL, <code>/tasks</code>, carry different <b>intents</b>. They also give shared rules: browsers and caches know a GET only reads, so it is safe to repeat. A POST may create something, so repeating it can create a duplicate.</p><div class=\"lv\"><b>Safe:</b> does not change data (GET). <b>Idempotent:</b> doing it twice leaves the same result as once (GET, PUT, DELETE). POST is not idempotent: two POSTs create two tasks.</div>"
    ],
    [
     "Anatomy of a request",
     "<p><b>HTTP</b> (HyperText Transfer Protocol) is the set of rules for how clients and servers exchange messages. A request carries four things:</p><pre>POST /tasks                         method and URL\nContent-Type: application/json      headers (extra information)\n\n{\"title\": \"Study\"}                  body (the data)</pre><p>The response carries a <b>status code</b> (201), headers, and a body. Typing a URL in a browser always sends GET, so to test POST, PUT, PATCH and DELETE you need curl, Postman or a form.</p>"
    ],
    [
     "HTTP methods",
     "<p>HTTP is the language clients and servers speak. A request has a <b>method</b>, URL, headers and optional body; a response has a status code, headers and body. The method states intent: GET reads, POST creates, PUT replaces a whole resource, PATCH changes part of it, DELETE removes it.</p><pre><code>app.post(\"/tasks\", ...)    // create\napp.put(\"/tasks/:id\", ...)   // replace all fields\napp.patch(\"/tasks/:id\", ...) // change only sent fields\napp.delete(\"/tasks/:id\", ...)</code></pre><p><b>PUT vs PATCH:</b> to mark a task done, PATCH sends {done:true}. PUT must send the whole task, or missing fields are lost.</p><div class=\"lv bad\"><b>Mistake.</b> POST to a path defined only with app.get gives Cannot POST /tasks.</div>"
    ],
    [
     "Build it step by step",
     "<h4>Step 1: data and GET</h4><pre><code>const express = require(\"express\");\nconst app = express();\napp.use(express.json());\nlet tasks = [{ id: 1, title: \"Study\", done: false }];\napp.get(\"/tasks\", (req, res) => res.json(tasks));</code></pre><p><code>tasks</code> is an array of objects held in memory. It resets when the server restarts. <code>express.json()</code> lets us read bodies (Day 9 explains it fully).</p><h4>Step 2: POST creates</h4><pre><code>app.post(\"/tasks\", (req, res) => {\n  const task = { id: tasks.length + 1, title: req.body.title, done: false };\n  tasks.push(task);\n  res.status(201).json(task);\n});</code></pre><p>We build a new object from the body, add it with <code>push</code>, and reply 201 Created with the new task.</p><h4>Step 3: PATCH and DELETE</h4><pre><code>app.patch(\"/tasks/:id\", (req, res) => {\n  const task = tasks.find(t => t.id === Number(req.params.id));\n  if (!task) return res.status(404).json({ message: \"Task not found\" });\n  Object.assign(task, req.body);\n  res.json(task);\n});\napp.delete(\"/tasks/:id\", (req, res) => {\n  tasks = tasks.filter(t => t.id !== Number(req.params.id));\n  res.status(204).send();\n});</code></pre><p><code>Object.assign</code> copies only the fields that were sent onto the task. <code>filter</code> keeps every task except the deleted one. 204 means success with nothing to send back.</p>"
    ],
    [
     "PUT vs PATCH, worked example",
     "<p>The task is {id:1, title:\"Study\", done:false}.</p><div class=\"lv\"><b>PATCH</b> with {done:true} gives {id:1, title:\"Study\", done:true}. Only done changed.</div><div class=\"lv\"><b>PUT</b> with {done:true} replaces the task with what you sent: {id:1, done:true}. The title is gone. A correct PUT sends {title:\"Study\", done:true}.</div><p>Use PATCH for small edits such as ticking a task, PUT when the client holds the full resource and saves it whole.</p>"
    ],
    [
     "Test it and common mistakes",
     "<pre><code>curl -X POST localhost:3000/tasks -H \"Content-Type: application/json\" -d '{\"title\":\"Read\"}'\ncurl -X PATCH localhost:3000/tasks/1 -H \"Content-Type: application/json\" -d '{\"done\":true}'\ncurl -X DELETE localhost:3000/tasks/1</code></pre><div class=\"lv bad\"><b>Wrong method.</b> app.get(\"/tasks\") with a POST request gives Cannot POST /tasks.</div><div class=\"lv bad\"><b>No Content-Type header.</b> Without application/json the body is not parsed and req.body is empty.</div><div class=\"lv bad\"><b>Testing in the address bar.</b> It only sends GET, so your POST route never runs.</div><div class=\"lv bad\"><b>Forgetting the response.</b> A handler that never replies leaves curl waiting.</div>"
    ]
   ],
   "fill": {
    "code": "app.___(\"/tasks\", (req, res) => res.status(201).json({}));",
    "a": [
     "post"
    ]
   },
   "q": [
    {
     "c": "HTTP methods",
     "q": "A client wants to change only a task's status. Best method?",
     "o": [
      "POST",
      "PUT",
      "PATCH"
     ],
     "a": 2,
     "e": "PATCH updates part of a resource."
    },
    {
     "c": "HTTP methods",
     "q": "You send POST /tasks but only app.get('/tasks') exists. Result?",
     "o": [
      "Cannot POST /tasks",
      "It hangs",
      "The handler runs"
     ],
     "a": 0,
     "e": "Method and path must both match."
    },
    {
     "c": "HTTP methods",
     "q": "Which method should not change server data?",
     "o": [
      "GET",
      "POST",
      "DELETE"
     ],
     "a": 0,
     "e": "GET is for reading."
    },
    {
     "c": "HTTP methods",
     "q": "You type localhost:3000/tasks in the browser. Which method is sent?",
     "o": [
      "PATCH",
      "GET",
      "POST"
     ],
     "a": 1,
     "e": "Address bars always send GET."
    },
    {
     "c": "HTTP methods",
     "q": "PUT with {done:true} replaces a full task. What is lost?",
     "o": [
      "Nothing",
      "The id route",
      "The title"
     ],
     "a": 2,
     "e": "PUT replaces the whole resource with what you sent."
    }
   ],
   "ch": "Add POST, PUT, PATCH and DELETE routes for /tasks. Test each with curl or Postman.",
   "rf": "Why PATCH instead of PUT to change one field?"
  },
  "5": {
   "s": [
    [
     "Why do status codes exist?",
     "<p>A client program cannot read a human message like \"Oops\" to know if something worked. The <b>status code</b> is a number every client understands. The first digit gives the family: 2xx success, 4xx the client made a mistake, 5xx the server failed. Without codes, every API would invent its own way to say \"it worked\".</p>"
    ],
    [
     "Mental model: the req object",
     "<p>An <b>object</b> is a bundle of named values called properties. <code>req</code> is an object Express builds for each request:</p><pre>req = {\n  method: \"GET\",\n  url: \"/tasks?done=true\",\n  params: { },                  values from /tasks/:id\n  query:  { done: \"true\" },     values after the ?\n  body:   { },                  data sent with POST, PUT, PATCH\n  headers: { host: \"localhost:3000\" }\n}</pre><p>So <code>req.query.done</code> means: take req, its query property, then its done property.</p>"
    ],
    [
     "Request and response",
     "<p><code>req</code> describes what the client sent: <code>req.method</code>, <code>req.url</code>, <code>req.headers</code> are properties of that object. <code>res</code> is how you answer: <code>res.send()</code> for text, <code>res.json()</code> for JSON, <code>res.status()</code> to set the code first.</p><pre><code>res.status(201).json({ message: \"Task created\" });</code></pre><p>200 OK, 201 Created, 204 No Content, 400 client sent bad data, 401 not logged in, 403 not allowed, 404 not found, 409 conflict (duplicate), 500 server bug.</p><div class=\"lv bad\"><b>Mistake.</b> Sending two responses gives \"Cannot set headers after they are sent\".</div>"
    ],
    [
     "Build it step by step",
     "<h4>Step 1: a successful read</h4><pre><code>app.get(\"/tasks\", (req, res) => res.json(tasks));</code></pre><p>No status call needed: the default is 200 OK.</p><h4>Step 2: a missing item</h4><pre><code>app.get(\"/tasks/:id\", (req, res) => {\n  const task = tasks.find(t => t.id === Number(req.params.id));\n  if (!task) return res.status(404).json({ message: \"Task not found\" });\n  res.json(task);\n});</code></pre><h4>Step 3: a bad request</h4><pre><code>app.post(\"/tasks\", (req, res) => {\n  if (!req.body.title) return res.status(400).json({ message: \"title is required\" });\n  res.status(201).json({ id: 2, title: req.body.title });\n});</code></pre><p>Each branch ends with return, so only one response is ever sent. The client receives the status line, headers like Content-Type: application/json, and the JSON body.</p>"
    ],
    [
     "The status codes in practice",
     "<div class=\"lv\"><b>200 OK:</b> the read or update worked. <b>201 Created:</b> POST made a new resource. <b>204 No Content:</b> worked, nothing to return (DELETE).</div><div class=\"lv\"><b>400 Bad Request:</b> missing or invalid data. <b>401 Unauthorized:</b> you are not logged in. <b>403 Forbidden:</b> logged in but not allowed. <b>404 Not Found:</b> no such resource. <b>409 Conflict:</b> clashes with existing data, such as a duplicate email.</div><div class=\"lv\"><b>500 Internal Server Error:</b> your code failed. Never use it for client mistakes.</div>"
    ],
    [
     "Common mistakes",
     "<div class=\"lv bad\"><b>Status without sending.</b> res.status(404); alone sets the code but sends nothing. The client waits. Chain .json() or .send().</div><div class=\"lv bad\"><b>200 with an error message.</b> res.json({error:\"not found\"}) still says 200, so clients think it worked.</div><div class=\"lv bad\"><b>Two responses.</b> res.json() then res.send() throws \"Cannot set headers after they are sent\". Use return.</div><div class=\"lv bad\"><b>res.json(404).</b> That sends the number 404 as the body, not a status.</div>"
    ]
   ],
   "fill": {
    "code": "res.___(404).json({ message: \"Not found\" });",
    "a": [
     "status"
    ]
   },
   "q": [
    {
     "c": "Request and response",
     "q": "A new task was saved. Best status?",
     "o": [
      "201",
      "404",
      "200"
     ],
     "a": 0,
     "e": "201 means created."
    },
    {
     "c": "Request and response",
     "q": "A task id does not exist. Status?",
     "o": [
      "404",
      "500",
      "201"
     ],
     "a": 0,
     "e": "The resource is missing, not the server broken."
    },
    {
     "c": "Request and response",
     "q": "What does res.json do?",
     "o": [
      "Starts the server",
      "Reads the body",
      "Sends a JSON reply"
     ],
     "a": 2,
     "e": "It converts to JSON and sends it."
    },
    {
     "c": "Request and response",
     "q": "res.status(404); runs and nothing else. What does the client see?",
     "o": [
      "A 404 page",
      "A 500 error",
      "It waits, nothing was sent"
     ],
     "a": 2,
     "e": "status only sets the code. You must also send."
    },
    {
     "c": "Request and response",
     "q": "A logged-in user tries to delete an admin-only task. Best status?",
     "o": [
      "403",
      "401",
      "404"
     ],
     "a": 0,
     "e": "They are known but not allowed."
    }
   ],
   "ch": "Make every /tasks route return the right status code.",
   "rf": "Why 404 and not 500 for a missing task?"
  },
  "6": {
   "s": [
    [
     "Why three places for data?",
     "<p>Each place has a job. The <b>path</b> says which resource (identify). The <b>query</b> refines a list (filter, sort, page). The <b>body</b> carries the data itself. Query strings appear in browser history and server logs, so never put passwords there. Bodies are not part of the URL.</p>"
    ],
    [
     "Mental model: anatomy of a URL",
     "<pre>POST /users/42/tasks?notify=true\n      |________| |______________|\n       params         query\nBody: {\"title\": \"Study\"}   becomes req.body</pre><p>A route can hold several params: <code>/users/:userId/tasks/:taskId</code> gives req.params.userId and req.params.taskId. Combine them freely: <code>GET /users/42/tasks?done=true</code> uses a param to pick the user and a query to filter.</p>"
    ],
    [
     "Params, query and body",
     "<p>Three ways data reaches the server. <code>req.params</code>: /tasks/42 identifies one thing. <code>req.query</code>: /tasks?done=true filters a list. <code>req.body</code>: JSON sent with POST, PUT or PATCH carries the data itself.</p><pre><code>app.get(\"/tasks\", (req, res) => res.json(req.query));\napp.post(\"/tasks\", (req, res) => res.status(201).json(req.body));</code></pre><p>Params and query values are strings.</p><div class=\"lv bad\"><b>Mistake.</b> Reading req.body without express.json() gives undefined (Day 9).</div>"
    ],
    [
     "Build it step by step",
     "<h4>Step 1: filter with query</h4><pre><code>app.get(\"/tasks\", (req, res) => {\n  const { done } = req.query;\n  if (done === undefined) return res.json(tasks);\n  res.json(tasks.filter(t => String(t.done) === done));\n});</code></pre><p><code>const { done } = req.query</code> is <b>destructuring</b>: pull the done property into a variable. Query values are strings, so we compare to the string \"true\".</p><h4>Step 2: pick one with params</h4><pre><code>app.get(\"/users/:userId/tasks/:taskId\", (req, res) => {\n  const { userId, taskId } = req.params;\n  res.json({ userId, taskId });\n});</code></pre><h4>Step 3: create from body</h4><pre><code>app.post(\"/tasks\", (req, res) => {\n  const { title } = req.body;\n  if (!title) return res.status(400).json({ message: \"title is required\" });\n  res.status(201).json({ id: 99, title, done: false });\n});</code></pre><p><b>JSON</b> is text that looks like a JavaScript object. The client sends it as text, express.json() turns it into an object on req.body.</p>"
    ],
    [
     "Common mistakes",
     "<div class=\"lv bad\"><b>Query is not params.</b> For /tasks?id=5 the value is req.query.id. req.params.id is undefined unless the route is /tasks/:id.</div><div class=\"lv bad\"><b>\"false\" is truthy.</b> req.query.done for ?done=false is the string \"false\", and if (\"false\") runs. Compare with === \"false\".</div><div class=\"lv bad\"><b>Numbers are strings.</b> req.params.id is \"7\". Convert with Number() before comparing to numeric ids.</div><div class=\"lv bad\"><b>Empty body.</b> No express.json() or no Content-Type: application/json header means req.body is empty.</div>"
    ]
   ],
   "fill": {
    "code": "const id = req.___.id;",
    "a": [
     "params"
    ]
   },
   "q": [
    {
     "c": "Params, query and body",
     "q": "URL /tasks?done=true. Where is done?",
     "o": [
      "req.params",
      "req.query",
      "req.body"
     ],
     "a": 1,
     "e": "After the ? is the query string."
    },
    {
     "c": "Params, query and body",
     "q": "Which carries a new task's data?",
     "o": [
      "req.url",
      "req.body",
      "req.query"
     ],
     "a": 1,
     "e": "Bodies carry created data."
    },
    {
     "c": "Params, query and body",
     "q": "req.body is undefined. Likely cause?",
     "o": [
      "Wrong port",
      "No listen",
      "No express.json()"
     ],
     "a": 2,
     "e": "Something must parse the body."
    },
    {
     "c": "Params, query and body",
     "q": "Route is /users/:userId/tasks/:taskId and the request is GET /users/3/tasks/9. What is req.params.taskId?",
     "o": [
      "9",
      "3",
      "undefined"
     ],
     "a": 0,
     "e": "Each named segment becomes a property."
    },
    {
     "c": "Params, query and body",
     "q": "The URL is /tasks?done=false. What is req.query.done?",
     "o": [
      "undefined",
      "The string 'false'",
      "The boolean false"
     ],
     "a": 1,
     "e": "Query values are always strings."
    }
   ],
   "ch": "GET /tasks?done=true filters tasks. POST /tasks adds one from the body.",
   "rf": "Why params for the id but body for the title?"
  },
  "7": {
   "s": [
    [
     "How this review works",
     "<p>Today adds no new ideas. Pulling knowledge out of your head, instead of rereading it, is what makes it stick. Build a small API from memory, then use the lesson only to check yourself.</p><div class=\"lv\"><b>Week 1 self-check.</b> Can you explain: what a route is, why the method matters, what req.params, req.query and req.body each hold, what 201, 400 and 404 mean, and why app.listen is needed?</div>"
    ],
    [
     "Week 1 review",
     "<p>Combine Week 1: server, routes, methods, status codes, params, query, body. Keep tasks in an array.</p><pre><code>let tasks = [{ id: 1, title: \"Learn Express\", done: false }];\napp.get(\"/tasks/:id\", (req, res) => {\n  const t = tasks.find(x => x.id === Number(req.params.id));\n  if (!t) return res.status(404).json({ message: \"Task not found\" });\n  res.json(t);\n});</code></pre><p>Number() converts the string param. <code>return</code> stops the function after replying, so it cannot send twice.</p>"
    ],
    [
     "Debugging practice",
     "<p>Find the bug in each snippet. Ask questions before changing anything.</p><pre><code>// A\napp.get(\"/books/:id\", (req, res) => {\n  const book = books.find(b => b.id === req.query.id);\n  res.json(book);\n});</code></pre><div class=\"lv\">Where does the id live in /books/3? Which object holds it? What type is it, and what type is b.id?</div><pre><code>// B\napp.post(\"/books\", (req, res) => {\n  books.push(req.body);\n  res.json(req.body);\n});</code></pre><div class=\"lv\">What status should a created book return? What happens if the body is empty? Is anything parsing the body?</div><p>Answers: A uses req.query instead of req.params and compares a string to a number. B should send 201, validate the body and needs express.json().</p>"
    ],
    [
     "Mini API specification",
     "<pre>GET    /books          list, support ?author=\nGET    /books/:id      one, 404 if missing\nPOST   /books          201, 400 if title missing\nDELETE /books/:id      204, 404 if missing</pre><p>Build it in one file with an in-memory array. Test every line of the spec with curl, including the failure cases.</p>"
    ]
   ],
   "fill": {
    "code": "tasks.___(x => x.id === 1)",
    "a": [
     "find"
    ]
   },
   "q": [
    {
     "c": "Week 1 review",
     "q": "Why Number(req.params.id)?",
     "o": [
      "It is faster",
      "Params are strings",
      "Express requires it"
     ],
     "a": 1,
     "e": "=== compares type too."
    },
    {
     "c": "Week 1 review",
     "q": "Why return before the 404 response?",
     "o": [
      "It is syntax",
      "It sets status",
      "It stops later code"
     ],
     "a": 2,
     "e": "Otherwise code keeps running."
    },
    {
     "c": "Week 1 review",
     "q": "Which array method finds one item?",
     "o": [
      "find",
      "map",
      "push"
     ],
     "a": 0,
     "e": "find returns the first match."
    },
    {
     "c": "Week 1 review",
     "q": "A request GET /books/3 reaches a route written as app.get('/books/:id'). Which expression reads the 3?",
     "o": [
      "req.body.id",
      "req.params.id",
      "req.query.id"
     ],
     "a": 1,
     "e": "Named path segments live in req.params."
    },
    {
     "c": "Week 1 review",
     "q": "books.find(b => b.id === req.params.id) never finds a book whose id is 3. Why?",
     "o": [
      "find is wrong",
      "The route is wrong",
      "The param is the string '3', not the number 3"
     ],
     "a": 2,
     "e": "=== compares types, so convert with Number()."
    }
   ],
   "ch": "Build in-memory CRUD for tasks with correct statuses and validation by hand.",
   "rf": "Which Week 1 idea was hardest and how did you debug it?"
  },
  "8": {
   "s": [
    [
     "Why does middleware exist?",
     "<p>Imagine logging every request. Without middleware you paste console.log into every route handler. Change the format and you edit fifty handlers. <b>Middleware</b> lets you write that step once and apply it to many routes. Real APIs use it for logging, parsing bodies, checking logins and handling errors.</p>"
    ],
    [
     "The request journey",
     "<pre>Request\n   |\n logger        calls next()\n   |\n auth check    calls next() or ends with 401\n   |\n route handler  res.json(...)\n   |\nResponse</pre><p>Each middleware gets <code>req</code>, <code>res</code> and <code>next</code>. <code>next</code> is a function: calling it hands the request to the next step in the chain. Types you will meet: application-level (<code>app.use</code>), router-level (Day 11), built-in (Day 9) and error-handling (Day 15).</p>"
    ],
    [
     "Middleware",
     "<p>Middleware is a function that runs between the request and your route handler, receiving <code>req</code>, <code>res</code> and <code>next</code>. Think airport security: it checks you, then lets you through.</p><pre><code>app.use((req, res, next) => {\n  console.log(req.method, req.url);\n  next();\n});</code></pre><p>Three outcomes: <code>next()</code> passes on; <code>res.json()</code> ends the request; doing neither leaves the client hanging. Middleware runs in the order written, so put it above the routes it should affect.</p>"
    ],
    [
     "Build it step by step",
     "<h4>Step 1: observe</h4><pre><code>app.use((req, res, next) => {\n  console.log(req.method, req.url);\n  next();\n});</code></pre><h4>Step 2: modify req</h4><pre><code>app.use((req, res, next) => {\n  req.requestTime = Date.now();\n  next();\n});\napp.get(\"/\", (req, res) => res.json({ at: req.requestTime }));</code></pre><p>req is one object passed along the whole chain, so anything added early is visible later.</p><h4>Step 3: block</h4><pre><code>app.use(\"/admin\", (req, res, next) => {\n  if (!req.headers[\"x-key\"]) return res.status(401).json({ message: \"Key required\" });\n  next();\n});</code></pre><p>Passing \"/admin\" limits it to paths that start with /admin.</p>"
    ],
    [
     "next() vs respond vs neither",
     "<div class=\"lv\"><b>next()</b>: the request continues to the next middleware or route.</div><div class=\"lv\"><b>res.json(...)</b>: the request ends here. Nothing after it runs for this request.</div><div class=\"lv bad\"><b>Neither:</b> the request is stuck. The browser spins until it times out.</div>"
    ],
    [
     "Common mistakes",
     "<div class=\"lv bad\"><b>Wrong order.</b> A logger placed after app.get(\"/tasks\") never logs /tasks, because the route already ended the request.</div><div class=\"lv bad\"><b>Both respond and next().</b> The next handler tries to respond again: \"headers already sent\".</div><div class=\"lv bad\"><b>Block without return.</b> res.status(401).json(...) then no return lets next() run too.</div>"
    ]
   ],
   "fill": {
    "code": "app.use((req, res, ___) => { ___(); });",
    "a": [
     "next",
     "next"
    ]
   },
   "q": [
    {
     "c": "Middleware",
     "q": "Middleware neither calls next nor responds. Result?",
     "o": [
      "404",
      "It passes on",
      "The request hangs"
     ],
     "a": 2,
     "e": "Nothing finishes the request."
    },
    {
     "c": "Middleware",
     "q": "Where to put a logger for all routes?",
     "o": [
      "Above routes",
      "Below routes",
      "Inside listen"
     ],
     "a": 0,
     "e": "Order matters."
    },
    {
     "c": "Middleware",
     "q": "What does next() do?",
     "o": [
      "Restarts",
      "Passes to the next function",
      "Ends the response"
     ],
     "a": 1,
     "e": "It continues the chain."
    },
    {
     "c": "Middleware",
     "q": "A logger sits below app.get('/tasks'), which responds. Is /tasks logged?",
     "o": [
      "Yes",
      "Only POST",
      "No"
     ],
     "a": 2,
     "e": "The route ends the request first, so the logger never runs."
    },
    {
     "c": "Middleware",
     "q": "A middleware calls res.json() and then next(). What is the problem?",
     "o": [
      "A second response may be attempted",
      "None",
      "It is faster"
     ],
     "a": 0,
     "e": "Only one response may be sent per request."
    }
   ],
   "ch": "Add a logger. Then remove next() to watch the hang, and put it back.",
   "rf": "Why did the request hang without next()?"
  },
  "9": {
   "s": [
    [
     "Why do we need express.json()?",
     "<p>When a client sends a body, it arrives as raw text in chunks: the characters {\"title\":\"Study\"}. Node does not turn that into an object for you. <b>express.json()</b> is built-in middleware that reads the raw text, parses it as JSON and stores the result on <code>req.body</code>.</p><pre>raw text:  {\"title\":\"Study\"}\n      |\n express.json()\n      |\nreq.body = { title: \"Study\" }</pre><p>It only acts when the request header says <code>Content-Type: application/json</code>. For classic HTML form posts there is a sibling, <code>express.urlencoded({ extended: true })</code>.</p>"
    ],
    [
     "Built-in middleware",
     "<p>Express ships <code>express.json()</code>, which reads a JSON request body and puts the result on <code>req.body</code>. Without it req.body is undefined. <code>express.static(\"public\")</code> serves files from a folder.</p><pre><code>app.use(express.json());\napp.use(express.static(\"public\"));</code></pre><p>Put express.json() above the routes that read req.body.</p>"
    ],
    [
     "Build it step by step",
     "<h4>Step 1: see the problem</h4><pre><code>app.post(\"/tasks\", (req, res) => {\n  console.log(req.body);   // undefined\n  res.send(\"ok\");\n});</code></pre><h4>Step 2: add the parser above the route</h4><pre><code>app.use(express.json());\napp.post(\"/tasks\", (req, res) => {\n  console.log(req.body);   // { title: \"Study\" }\n  res.status(201).json(req.body);\n});</code></pre><p>app.use registers it for every request, in order, so it must come before the routes that need req.body.</p><h4>Step 3: serve static files</h4><pre><code>const path = require(\"path\");\napp.use(express.static(path.join(__dirname, \"public\")));</code></pre><p>A <b>static file</b> is served as-is: HTML, CSS, images. If public/index.html exists, GET / returns it. The folder name is not part of the URL: public/logo.png is at /logo.png. <code>__dirname</code> is the folder of the current file, so the path works from any terminal location.</p>"
    ],
    [
     "Common mistakes",
     "<div class=\"lv bad\"><b>Parser below the route.</b> The route runs first and sees no body. Order matters.</div><div class=\"lv bad\"><b>Wrong Content-Type.</b> JSON sent as text/plain is ignored by express.json().</div><div class=\"lv bad\"><b>Invalid JSON.</b> A body like {title: Study} cannot be parsed, and Express replies 400 before your route runs. Check commas and double quotes.</div><div class=\"lv bad\"><b>Relative static path.</b> express.static(\"public\") depends on where you started node. Prefer path.join(__dirname, \"public\").</div>"
    ]
   ],
   "fill": {
    "code": "app.use(express.___());",
    "a": [
     "json"
    ]
   },
   "q": [
    {
     "c": "Built-in middleware",
     "q": "req.body is undefined on POST. Fix?",
     "o": [
      "app.use(express.json()) above routes",
      "Use GET",
      "Change port"
     ],
     "a": 0,
     "e": "The body must be parsed first."
    },
    {
     "c": "Built-in middleware",
     "q": "What does express.static do?",
     "o": [
      "Logs",
      "Serves files",
      "Parses JSON"
     ],
     "a": 1,
     "e": "It serves a folder."
    },
    {
     "c": "Built-in middleware",
     "q": "Where does express.json() go?",
     "o": [
      "After listen",
      "Inside a handler",
      "Before routes"
     ],
     "a": 2,
     "e": "It must run first."
    },
    {
     "c": "Built-in middleware",
     "q": "A client sends JSON with Content-Type text/plain. What does express.json() do?",
     "o": [
      "Ignores it, body not parsed",
      "Parses it anyway",
      "Returns 500"
     ],
     "a": 0,
     "e": "It only parses requests declared as application/json."
    },
    {
     "c": "Built-in middleware",
     "q": "express.static('public') is set and public/logo.png exists. Which URL serves it?",
     "o": [
      "/static/logo.png",
      "/logo.png",
      "/public/logo.png"
     ],
     "a": 1,
     "e": "The static folder is the root of the URL."
    }
   ],
   "ch": "Parse JSON bodies and serve public/index.html.",
   "rf": "Why is JSON parsing not automatic?"
  },
  "10": {
   "s": [
    [
     "Why write your own middleware?",
     "<p>Built-in middleware cannot know your rules. Timing requests, checking an API key, or attaching the current user are repeated steps that belong in one place. Custom middleware is just a function with (req, res, next) that you write yourself.</p><p>A useful pattern is a function that <b>returns</b> a middleware, so you can configure it:</p><pre><code>const requireKey = (key) => (req, res, next) => {\n  if (req.headers[\"x-key\"] !== key) return res.status(401).json({ message: \"Unauthorized\" });\n  next();\n};\napp.delete(\"/tasks/:id\", requireKey(\"secret\"), handler);</code></pre>"
    ],
    [
     "Custom middleware",
     "<p>Custom middleware removes repeated work. A fake auth check that also adds data to <code>req</code>:</p><pre><code>const auth = (req, res, next) => {\n  if (req.headers[\"x-key\"] !== \"secret\")\n    return res.status(401).json({ message: \"Unauthorized\" });\n  req.user = { name: \"Abdul\" };\n  next();\n};\napp.get(\"/private\", auth, (req, res) => res.json(req.user));</code></pre><p>auth is route-level. A timer is the same idea: record Date.now() before next(), measure after the response finishes. This is a simulation, not real security.</p>"
    ],
    [
     "Build it step by step",
     "<h4>Step 1: logger with a clear format</h4><pre><code>const logger = (req, res, next) => {\n  console.log(new Date().toISOString(), req.method, req.originalUrl);\n  next();\n};\napp.use(logger);</code></pre><h4>Step 2: request timer</h4><pre><code>const timer = (req, res, next) => {\n  const start = Date.now();\n  res.on(\"finish\", () => console.log(req.method, req.url, Date.now() - start, \"ms\"));\n  next();\n};</code></pre><p>The response is not finished when next() returns, so we listen for the <code>finish</code> event, which fires once the response has been sent.</p><h4>Step 3: attach data to req</h4><pre><code>const fakeAuth = (req, res, next) => {\n  if (req.headers[\"x-key\"] !== \"secret\") return res.status(401).json({ message: \"Unauthorized\" });\n  req.user = { id: 1, name: \"Abdul\" };\n  next();\n};\napp.get(\"/me\", fakeAuth, (req, res) => res.json(req.user));</code></pre>"
    ],
    [
     "Where to apply it, and in what order",
     "<div class=\"lv\"><b>Everywhere:</b> app.use(logger). <b>One path:</b> app.use(\"/admin\", fakeAuth). <b>One route:</b> app.get(\"/me\", fakeAuth, handler).</div><p>Order is the order you wrote: app.use(logger); app.use(timer); app.use(express.json()); routes. Put cheap, universal steps first and the ones that can reject a request before the work they protect.</p>"
    ],
    [
     "Common mistakes",
     "<div class=\"lv bad\"><b>Block without return.</b> The 401 is sent, then next() also runs and the handler tries to respond again.</div><div class=\"lv bad\"><b>Auth placed after the route.</b> The route has already answered, so the check never runs.</div><div class=\"lv bad\"><b>Believing the fake auth is safe.</b> A header anyone can send is not security. Real authentication comes later in your path.</div>"
    ]
   ],
   "fill": {
    "code": "req.user = { name: \"Abdul\" }; ___();",
    "a": [
     "next"
    ]
   },
   "q": [
    {
     "c": "Custom middleware",
     "q": "To block a request with 401 you should...",
     "o": [
      "do both",
      "respond and not call next",
      "call next only"
     ],
     "a": 1,
     "e": "Responding ends it."
    },
    {
     "c": "Custom middleware",
     "q": "How does a later handler see req.user?",
     "o": [
      "Automatic",
      "From query",
      "Earlier middleware set it"
     ],
     "a": 2,
     "e": "req is shared along the chain."
    },
    {
     "c": "Custom middleware",
     "q": "auth is placed after the route. Effect?",
     "o": [
      "It never runs for it",
      "Runs twice",
      "Faster"
     ],
     "a": 0,
     "e": "Order matters."
    },
    {
     "c": "Custom middleware",
     "q": "A middleware is only needed for /admin routes. What is the right approach?",
     "o": [
      "Add an if to every route",
      "app.use('/admin', fn) or route-level use",
      "It cannot be limited"
     ],
     "a": 1,
     "e": "Express lets you scope middleware by path or route."
    },
    {
     "c": "Custom middleware",
     "q": "Why does the timer measure inside res.on('finish')?",
     "o": [
      "Express requires it",
      "next() is not needed",
      "The response is complete only then"
     ],
     "a": 2,
     "e": "next() returns before the response is sent."
    }
   ],
   "ch": "Build timer and auth middleware. Protect DELETE with auth.",
   "rf": "Why is this auth only a simulation?"
  },
  "11": {
   "s": [
    [
     "Why do routers exist?",
     "<p>Real APIs have dozens of routes: tasks, users, comments. Put them all in server.js and it becomes thousands of lines. A <b>router</b> is a mini app that holds a group of related routes. server.js stays short and each resource gets its own file.</p><pre>server.js\n   |-- app.use(\"/tasks\", tasksRouter)  ->  routes/tasks.js\n   |-- app.use(\"/users\", usersRouter)  ->  routes/users.js</pre><p><b>Module refresher:</b> in CommonJS, <code>module.exports = x</code> shares x from a file and <code>require(\"./file\")</code> loads it. Paths to your own files start with ./ . Without it Node looks for an installed package.</p>"
    ],
    [
     "Express Router",
     "<p>One big server file gets hard to read. <code>express.Router()</code> creates a mini app for related routes.</p><pre><code>// routes/tasks.js\nconst router = require(\"express\").Router();\nrouter.get(\"/\", (req, res) => res.json([]));\nmodule.exports = router;\n// server.js\napp.use(\"/tasks\", require(\"./routes/tasks\"));</code></pre><p>Inside the router \"/\" means /tasks. <code>module.exports</code> shares the router.</p><div class=\"lv bad\"><b>Mistake.</b> Forgetting module.exports gives an error that app.use needs a function.</div>"
    ],
    [
     "Build it step by step",
     "<h4>Step 1: create the router file</h4><pre><code>// routes/tasks.js\nconst express = require(\"express\");\nconst router = express.Router();\nrouter.get(\"/\", (req, res) => res.json([]));\nrouter.get(\"/:id\", (req, res) => res.json({ id: req.params.id }));\nrouter.post(\"/\", (req, res) => res.status(201).json(req.body));\nmodule.exports = router;</code></pre><h4>Step 2: mount it</h4><pre><code>// server.js\nconst tasksRouter = require(\"./routes/tasks\");\napp.use(\"/tasks\", tasksRouter);</code></pre><p>The mount path <b>/tasks</b> is added in front of every path inside the router. \"/\" becomes /tasks, \"/:id\" becomes /tasks/:id.</p><h4>Step 3: router-level middleware</h4><pre><code>router.use((req, res, next) => { console.log(\"tasks area\"); next(); });</code></pre><p>It runs only for requests under /tasks.</p>"
    ],
    [
     "Common mistakes",
     "<div class=\"lv bad\"><b>Repeating the prefix.</b> router.get(\"/tasks\") mounted at /tasks serves /tasks/tasks.</div><div class=\"lv bad\"><b>Missing module.exports.</b> app.use then receives an empty object and throws: app.use requires a middleware function.</div><div class=\"lv bad\"><b>Wrong require path.</b> require(\"routes/tasks\") fails with Cannot find module. Use ./routes/tasks.</div><div class=\"lv bad\"><b>Mounting after the 404 handler.</b> The catch-all answers first.</div>"
    ]
   ],
   "fill": {
    "code": "app.___(\"/tasks\", taskRouter);",
    "a": [
     "use"
    ]
   },
   "q": [
    {
     "c": "Express Router",
     "q": "Router path '/:id' mounted at /tasks matches?",
     "o": [
      "/5",
      "/tasks",
      "/tasks/5"
     ],
     "a": 2,
     "e": "The mount path is a prefix."
    },
    {
     "c": "Express Router",
     "q": "Why routers?",
     "o": [
      "Organization",
      "Speed",
      "Required"
     ],
     "a": 0,
     "e": "They keep files small."
    },
    {
     "c": "Express Router",
     "q": "app.use requires a callback. Likely cause?",
     "o": [
      "No body",
      "Missing module.exports",
      "Wrong port"
     ],
     "a": 1,
     "e": "Nothing was exported."
    },
    {
     "c": "Express Router",
     "q": "router.get('/tasks') is in routes/tasks.js and it is mounted with app.use('/tasks', router). Which URL works?",
     "o": [
      "/tasks",
      "/",
      "/tasks/tasks"
     ],
     "a": 2,
     "e": "Mount path plus router path: /tasks + /tasks."
    },
    {
     "c": "Express Router",
     "q": "require('routes/tasks') gives Cannot find module. Fix?",
     "o": [
      "Use ./routes/tasks",
      "npm install routes",
      "Rename the file"
     ],
     "a": 0,
     "e": "Local files need a relative path starting with ./ ."
    }
   ],
   "ch": "Move task routes into routes/tasks.js.",
   "rf": "What does mounting at /tasks change?"
  },
  "12": {
   "s": [
    [
     "Why separate controllers from routes?",
     "<p>Routes answer: which URL and method? Handlers answer: what should happen? When both live together, a route file becomes a wall of logic. A <b>controller</b> is a file of functions, one per action. The route file then reads like a table of contents.</p><pre>Route:       GET /tasks/:id\n   |\nController:  getTask  (find task, choose 200 or 404)\n   |\nResponse:    res.json(task)</pre><p>This is <b>separation of responsibilities</b>: each file has one job, so bugs are easier to locate and code is easier to reuse and test.</p>"
    ],
    [
     "Controllers",
     "<p>A <b>controller</b> is a function holding the logic for a route. The route decides where, the controller decides what.</p><pre><code>// controllers/tasks.js\nexports.getTasks = (req, res) => res.json(tasks);\n// routes/tasks.js\nrouter.get(\"/\", controller.getTasks);</code></pre><p>Routes stay readable and logic can be reused and tested. Flow: Route, then Controller, then Response.</p>"
    ],
    [
     "Build it step by step",
     "<h4>Before: logic inside the route</h4><pre><code>router.get(\"/:id\", (req, res) => {\n  const task = tasks.find(t => t.id === Number(req.params.id));\n  if (!task) return res.status(404).json({ message: \"Task not found\" });\n  res.json(task);\n});</code></pre><h4>After: a controller file</h4><pre><code>// controllers/tasks.js\nlet tasks = [{ id: 1, title: \"Study\", done: false }];\nexports.getTasks = (req, res) => res.json(tasks);\nexports.getTask = (req, res) => {\n  const task = tasks.find(t => t.id === Number(req.params.id));\n  if (!task) return res.status(404).json({ message: \"Task not found\" });\n  res.json(task);\n};</code></pre><h4>The route file only wires things up</h4><pre><code>// routes/tasks.js\nconst controller = require(\"../controllers/tasks\");\nrouter.get(\"/\", controller.getTasks);\nrouter.get(\"/:id\", controller.getTask);</code></pre><p>Notice <code>controller.getTasks</code> has no parentheses. We hand Express the function and Express calls it when a request arrives. ../ means go up one folder.</p>"
    ],
    [
     "Common mistakes",
     "<div class=\"lv bad\"><b>Calling instead of passing.</b> router.get(\"/\", getTasks()) runs getTasks immediately, with no req or res, and passes its result to Express.</div><div class=\"lv bad\"><b>Forgetting exports.</b> controller.getTask is undefined, so Express throws that a handler must be a function.</div><div class=\"lv bad\"><b>Putting URL logic in controllers.</b> Paths belong in routes. Controllers should not need to know their URL.</div>"
    ]
   ],
   "fill": {
    "code": "router.get(\"/\", controller.___);",
    "a": [
     "getTasks"
    ]
   },
   "q": [
    {
     "c": "Controllers",
     "q": "Where does the logic go?",
     "o": [
      "Controller",
      "listen",
      "Router path"
     ],
     "a": 0,
     "e": "Controllers hold logic."
    },
    {
     "c": "Controllers",
     "q": "After refactor a route file contains...",
     "o": [
      "Data",
      "Paths and controller references",
      "All logic"
     ],
     "a": 1,
     "e": "Routes map to controllers."
    },
    {
     "c": "Controllers",
     "q": "Main benefit?",
     "o": [
      "Faster code",
      "Fewer files",
      "Separate responsibilities"
     ],
     "a": 2,
     "e": "Each file has one job."
    },
    {
     "c": "Controllers",
     "q": "router.get('/', getTasks()) is written. What goes wrong?",
     "o": [
      "getTasks runs immediately and its result is passed instead of the function",
      "Nothing",
      "It is faster"
     ],
     "a": 0,
     "e": "Parentheses call the function now. Pass the reference."
    },
    {
     "c": "Controllers",
     "q": "Which belongs in a controller, not the route file?",
     "o": [
      "app.listen",
      "Finding the task and choosing the status",
      "The URL path"
     ],
     "a": 1,
     "e": "Controllers decide what happens. Routes decide where."
    }
   ],
   "ch": "Create controllers for all task routes.",
   "rf": "Route vs controller: what does each decide?"
  },
  "13": {
   "s": [
    [
     "Why does REST exist?",
     "<p>Before shared conventions every team invented its own URLs: /getAllTasks, /task/delete?id=5, /removeTask/5. Clients had to learn each API from scratch. <b>REST</b> (Representational State Transfer) is a practical set of conventions: model your data as <b>resources</b> (tasks, users), name them with nouns, and let the HTTP method be the verb. Anyone who knows the pattern can guess your API.</p><p>A REST API is also <b>stateless</b>: every request carries everything the server needs, and the server does not remember the previous request.</p><div class=\"lv\"><b>CRUD</b> means Create, Read, Update, Delete, the four things you do to data. POST creates, GET reads, PUT or PATCH updates, DELETE deletes. Our Task API is one resource with all four.</div>"
    ],
    [
     "REST + CRUD",
     "<p><b>REST</b> is a convention: URLs are nouns (resources), methods are verbs.</p><pre><code>GET    /tasks       list     200\nGET    /tasks/:id   one      200 or 404\nPOST   /tasks       create   201\nPUT    /tasks/:id   replace  200\nPATCH  /tasks/:id   update   200\nDELETE /tasks/:id   remove   204</code></pre><p>Avoid verbs in URLs such as /getTasks or /deleteTask/5.</p>"
    ],
    [
     "The complete tasks resource",
     "<pre><code>// controllers/tasks.js\nlet tasks = [{ id: 1, title: \"Study\", done: false }];\nlet nextId = 2;\nconst find = (req) => tasks.find(t => t.id === Number(req.params.id));\n\nexports.list = (req, res) => res.json(tasks);\nexports.get = (req, res) => {\n  const t = find(req);\n  if (!t) return res.status(404).json({ message: \"Task not found\" });\n  res.json(t);\n};\nexports.create = (req, res) => {\n  const t = { id: nextId++, title: req.body.title, done: false };\n  tasks.push(t);\n  res.status(201).json(t);\n};\nexports.replace = (req, res) => {\n  const t = find(req);\n  if (!t) return res.status(404).json({ message: \"Task not found\" });\n  t.title = req.body.title; t.done = Boolean(req.body.done);\n  res.json(t);\n};\nexports.update = (req, res) => {\n  const t = find(req);\n  if (!t) return res.status(404).json({ message: \"Task not found\" });\n  Object.assign(t, req.body);\n  res.json(t);\n};\nexports.remove = (req, res) => {\n  if (!find(req)) return res.status(404).json({ message: \"Task not found\" });\n  tasks = tasks.filter(t => t.id !== Number(req.params.id));\n  res.status(204).send();\n};</code></pre><p>Notice how the six functions tell one story: a task is listed, fetched, created, replaced, changed in part, and removed. Every one that takes an id answers 404 for a task that does not exist.</p>"
    ],
    [
     "Naming conventions",
     "<div class=\"lv\">Use <b>plural nouns</b>: /tasks, not /task. Use <b>nesting</b> for ownership: /users/42/tasks. Use lowercase and hyphens: /task-lists. Put filters in the query: /tasks?done=true. Never put verbs or file extensions in a path.</div>"
    ],
    [
     "Common mistakes",
     "<div class=\"lv bad\"><b>Verbs in URLs.</b> POST /createTask repeats what POST already says.</div><div class=\"lv bad\"><b>POST for everything.</b> You lose the meaning of methods and the safety rules clients rely on.</div><div class=\"lv bad\"><b>Always 200.</b> A created task should be 201, a deleted one 204, a missing one 404.</div><div class=\"lv bad\"><b>Mixing singular and plural.</b> /task/1 next to /tasks makes the API unpredictable.</div>"
    ]
   ],
   "fill": {
    "code": "app.___(\"/tasks/:id\", remove);",
    "a": [
     "delete"
    ]
   },
   "q": [
    {
     "c": "REST + CRUD",
     "q": "Best way to delete task 5?",
     "o": [
      "POST /remove",
      "DELETE /tasks/5",
      "GET /deleteTask/5"
     ],
     "a": 1,
     "e": "Method is the verb."
    },
    {
     "c": "REST + CRUD",
     "q": "Status for a successful DELETE without a body?",
     "o": [
      "201",
      "404",
      "204"
     ],
     "a": 2,
     "e": "No Content."
    },
    {
     "c": "REST + CRUD",
     "q": "Why nouns in URLs?",
     "o": [
      "The method is the verb",
      "Shorter",
      "Required"
     ],
     "a": 0,
     "e": "REST convention."
    },
    {
     "c": "REST + CRUD",
     "q": "A client wants to see only completed tasks. Which URL fits REST best?",
     "o": [
      "POST /tasks/done",
      "GET /tasks?done=true",
      "GET /getDoneTasks"
     ],
     "a": 1,
     "e": "Filters belong in the query string of the collection."
    },
    {
     "c": "REST + CRUD",
     "q": "Which pair is consistent REST naming?",
     "o": [
      "GET /task/5 and POST /deleteTasks",
      "GET /tasks/get/5",
      "GET /tasks/5 and DELETE /tasks/5"
     ],
     "a": 2,
     "e": "Same noun, different methods for different actions."
    }
   ],
   "ch": "Make /tasks fully RESTful with the correct codes.",
   "rf": "Why is /getTasks poor design?"
  },
  "14": {
   "s": [
    [
     "How to approach a project",
     "<p>Projects feel hard because you must decide, not just follow. A reliable method: <b>plan</b> on paper first, <b>build</b> one endpoint at a time, <b>test</b> after every change.</p><p>Requirements checklist for your Task API:</p><pre>[ ] server.js creates the app and listens on a port\n[ ] express.json() before the routes\n[ ] logger middleware on every request\n[ ] routes/tasks.js with an Express Router\n[ ] controllers/tasks.js with six functions\n[ ] GET /tasks, GET /tasks/:id, POST /tasks\n[ ] PUT /tasks/:id, PATCH /tasks/:id, DELETE /tasks/:id\n[ ] correct codes: 200, 201, 204, 404\n[ ] 404 JSON response for unknown routes</pre><pre>task-api/\n  server.js\n  routes/tasks.js\n  controllers/tasks.js\n  package.json</pre>"
    ],
    [
     "Week 2 project",
     "<p>Build the Task API on your own. Requirements: routes and controllers folders, express.json, a logger, all six REST endpoints, correct status codes, 404 for unknown ids. Stuck? Start with the server, add one endpoint at a time, test after each.</p>"
    ],
    [
     "Hints, only when stuck",
     "<div class=\"lv\"><b>Hint 1.</b> Build server.js and a single GET /tasks first. Do not move on until curl returns data.</div><div class=\"lv\"><b>Hint 2.</b> Add the router and controller for that one route, then add the other five one by one.</div><div class=\"lv\"><b>Hint 3.</b> Reread Days 11 to 13. The shape of each file is the same as in those lessons, but you write it without copying.</div>"
    ],
    [
     "Learn to debug: a guided example",
     "<pre><code>app.post(\"/tasks\", (req, res) => {\n  tasks.push({ id: 2, title: req.body.title });\n  res.status(201).json(tasks);\n});</code></pre><p>A new task is saved with <b>title: undefined</b>. Do not guess. Ask questions in order.</p><div class=\"lv\"><b>1.</b> What does req.body contain? Add console.log(req.body) as the first line.</div><div class=\"lv\"><b>2.</b> It prints undefined. What fills req.body? Think of Day 9.</div><div class=\"lv\"><b>3.</b> Where is app.use(express.json()) in your file? It must be above this route.</div><p>Method: observe a value, find what produces it, check where that producer sits. This works for most Express bugs.</p><div class=\"lv\"><b>Debug checklist:</b> read the first line of the terminal error; check method and path with curl -i; log req.params, req.query and req.body; check middleware order; check you export and require correctly.</div>"
    ],
    [
     "Review rubric",
     "<p>When finished, ask: can I explain every file? Does each endpoint return the right code? Did I test a missing id, a bad body and an unknown route? If not, fix it before Day 15.</p>"
    ]
   ],
   "fill": {
    "code": "const router = express.___();",
    "a": [
     "router"
    ]
   },
   "q": [
    {
     "c": "Week 2 project",
     "q": "First step when stuck?",
     "o": [
      "Rewrite everything",
      "Skip",
      "Read the error message"
     ],
     "a": 2,
     "e": "Errors point to the problem."
    },
    {
     "c": "Week 2 project",
     "q": "When do you test an endpoint?",
     "o": [
      "After each change",
      "At the end",
      "Never"
     ],
     "a": 0,
     "e": "Small steps find bugs fast."
    },
    {
     "c": "Week 2 project",
     "q": "Where do paths belong?",
     "o": [
      "package.json",
      "Routes",
      "Controllers"
     ],
     "a": 1,
     "e": "Routes map paths."
    },
    {
     "c": "Week 2 project",
     "q": "A POST saves title undefined. What do you check first?",
     "o": [
      "The port number",
      "The package name",
      "Whether express.json() is above the route"
     ],
     "a": 2,
     "e": "An empty body usually means the body was never parsed."
    },
    {
     "c": "Week 2 project",
     "q": "What is the best way to test an endpoint after writing it?",
     "o": [
      "Call it with curl and check status and body",
      "Read the code again",
      "Wait until the end"
     ],
     "a": 0,
     "e": "Small tests catch bugs while the cause is fresh."
    }
   ],
   "ch": "Finish the Week 2 project without copying the lessons.",
   "rf": "What did you design yourself?"
  },
  "15": {
   "s": [
    [
     "Why does error handling exist?",
     "<p>Things go wrong: a task is missing, JSON is invalid, a function throws. If you do nothing, Express sends a default HTML error page that can reveal your stack trace, and a bug in async code can leave the request hanging or crash the server. Clients need a clear, consistent answer.</p><div class=\"lv\"><b>Synchronous error:</b> thrown while code runs normally. Express catches it and sends it to error middleware. <b>Asynchronous error:</b> happens later, inside a promise or callback. In Express 4 you must catch it and call next(err). Express 5 forwards rejected promises for you, and calling next(err) still works in both.</div><pre>handler throws or calls next(err)\n        |\nskips all normal middleware and routes\n        |\nerror middleware (4 parameters)\n        |\nJSON response with a status</pre>"
    ],
    [
     "Error handling",
     "<p>Errors happen: bad input, missing data, bugs. Catch them and answer clearly. Error middleware has four parameters, which is how Express recognises it.</p><pre><code>app.use((err, req, res, next) => {\n  res.status(err.status || 500).json({ message: err.message });\n});</code></pre><p>Place it after all routes. Pass errors on with <code>next(err)</code>. Use try/catch around risky code.</p>"
    ],
    [
     "Build it step by step",
     "<h4>Step 1: a helper error with a status</h4><pre><code>class AppError extends Error {\n  constructor(message, status) { super(message); this.status = status; }\n}</code></pre><p>A <b>class</b> is a blueprint for objects. AppError is an Error that also remembers an HTTP status.</p><h4>Step 2: raise it</h4><pre><code>exports.get = (req, res, next) => {\n  const t = tasks.find(x => x.id === Number(req.params.id));\n  if (!t) return next(new AppError(\"Task not found\", 404));\n  res.json(t);\n};</code></pre><h4>Step 3: catch unknown routes, then handle everything last</h4><pre><code>app.use((req, res, next) => next(new AppError(\"Route not found\", 404)));\napp.use((err, req, res, next) => {\n  const status = err.status || 500;\n  res.status(status).json({ status: \"error\", message: status === 500 ? \"Server error\" : err.message });\n});</code></pre><p>Every error now returns the same JSON shape. For 500s we hide the real message, because it may expose internals. We log it instead with console.error(err).</p>"
    ],
    [
     "try/catch",
     "<pre><code>exports.create = (req, res, next) => {\n  try {\n    const data = JSON.parse(req.body.raw);\n    res.status(201).json(data);\n  } catch (err) {\n    next(err);\n  }\n};</code></pre><p>try runs code that might fail. If it throws, execution jumps to catch. Calling next(err) hands the problem to your error middleware.</p>"
    ],
    [
     "Common mistakes",
     "<div class=\"lv bad\"><b>Handler placed first.</b> It must be after all routes and other app.use calls.</div><div class=\"lv bad\"><b>Three parameters.</b> Express only treats a function as an error handler if it has four, even if you never use next.</div><div class=\"lv bad\"><b>Swallowing the error.</b> catch (err) { console.log(err) } with no response leaves the client waiting.</div><div class=\"lv bad\"><b>Leaking stack traces.</b> Do not send err.stack to clients.</div>"
    ]
   ],
   "fill": {
    "code": "app.use((___, req, res, next) => {});",
    "a": [
     "err"
    ]
   },
   "q": [
    {
     "c": "Error handling",
     "q": "Where goes error middleware?",
     "o": [
      "After routes",
      "Before routes",
      "Inside a route"
     ],
     "a": 0,
     "e": "It catches what routes pass."
    },
    {
     "c": "Error handling",
     "q": "How many parameters?",
     "o": [
      "2",
      "4",
      "3"
     ],
     "a": 1,
     "e": "Four marks it as an error handler."
    },
    {
     "c": "Error handling",
     "q": "Pass an error on with...",
     "o": [
      "return",
      "nothing",
      "next(err)"
     ],
     "a": 2,
     "e": "That triggers the handler."
    },
    {
     "c": "Error handling",
     "q": "An error handler is written with (req, res, next). Why is it never called for errors?",
     "o": [
      "It needs four parameters",
      "It needs async",
      "It needs a port"
     ],
     "a": 0,
     "e": "The four-argument signature marks error middleware."
    },
    {
     "c": "Error handling",
     "q": "Why replace the message with 'Server error' for status 500?",
     "o": [
      "Express requires it",
      "The real message may reveal internals",
      "It is shorter"
     ],
     "a": 1,
     "e": "Log the details, show the client a safe message."
    }
   ],
   "ch": "Add a central error handler with one JSON format.",
   "rf": "Why one consistent error format?"
  },
  "16": {
   "s": [
    [
     "Why does validation exist?",
     "<p><b>Untrusted input</b> is anything that comes from outside your code: bodies, params, query strings, headers. Clients can be browsers, scripts, other servers or attackers. They can send missing fields, wrong types, huge strings. A frontend form check does not protect you, because requests can skip the form entirely. <b>Validation</b> means checking input against your rules before using it.</p><div class=\"lv\">Validate: required fields, <b>type</b> (string vs number), <b>length or range</b>, allowed values, format (an email looks like an email).</div><pre>Request -> validate -> invalid? 400 with reasons\n                    -> valid?   controller</pre>"
    ],
    [
     "Validation",
     "<p>Never trust input. Validate before using it.</p><pre><code>const { title } = req.body;\nif (!title || typeof title !== \"string\")\n  return res.status(400).json({ message: \"title is required\" });</code></pre><p>Check required fields, types and lengths. 400 means the client's request is wrong. Libraries like Joi or Zod do this at scale.</p>"
    ],
    [
     "Build it step by step",
     "<h4>Step 1: a validation middleware</h4><pre><code>const validateTask = (req, res, next) => {\n  const { title, done } = req.body;\n  const errors = [];\n  if (typeof title !== \"string\" || title.trim() === \"\") errors.push(\"title must be a non-empty string\");\n  else if (title.length > 100) errors.push(\"title must be 100 characters or fewer\");\n  if (done !== undefined &amp;&amp; typeof done !== \"boolean\") errors.push(\"done must be true or false\");\n  if (errors.length > 0) return res.status(400).json({ status: \"error\", errors });\n  next();\n};\nrouter.post(\"/\", validateTask, controller.create);</code></pre><p>Collecting every problem in an array lets the client fix all of them at once. The check runs before the controller, so bad data is never saved.</p><h4>Step 2: validate params and PATCH carefully</h4><pre><code>const id = Number(req.params.id);\nif (!Number.isInteger(id)) return res.status(400).json({ message: \"id must be a number\" });</code></pre><p>For PATCH, validate only the fields that were sent.</p><h4>Step 3: a library at scale</h4><pre><code>const { z } = require(\"zod\");\nconst schema = z.object({ title: z.string().min(1).max(100), done: z.boolean().optional() });\nconst result = schema.safeParse(req.body);\nif (!result.success) return res.status(400).json(result.error.issues);</code></pre><p>Libraries such as Zod and Joi describe rules once and give consistent error messages. Learn the manual way first so you understand what they do.</p>"
    ],
    [
     "Common mistakes",
     "<div class=\"lv bad\"><b>Only checking !title.</b> The number 123 passes. Check typeof too.</div><div class=\"lv bad\"><b>Number(\"abc\").</b> It gives NaN, not an error. Test with Number.isInteger or Number.isNaN.</div><div class=\"lv bad\"><b>Validating after saving.</b> The bad record already exists.</div><div class=\"lv bad\"><b>Using 500 for bad input.</b> 400 means the client's data is wrong. 500 means your code failed.</div>"
    ]
   ],
   "fill": {
    "code": "if (!title) return res.status(___).json({});",
    "a": [
     "400"
    ]
   },
   "q": [
    {
     "c": "Validation",
     "q": "Missing title. Status?",
     "o": [
      "201",
      "400",
      "500"
     ],
     "a": 1,
     "e": "The client's mistake."
    },
    {
     "c": "Validation",
     "q": "Why validate?",
     "o": [
      "Faster",
      "Required",
      "Input is untrusted"
     ],
     "a": 2,
     "e": "Clients can send anything."
    },
    {
     "c": "Validation",
     "q": "Validate where?",
     "o": [
      "Before saving",
      "After saving",
      "Never"
     ],
     "a": 0,
     "e": "Bad data must not be saved."
    },
    {
     "c": "Validation",
     "q": "req.body.title is the number 123 and the code only checks if (!title). What is missing?",
     "o": [
      "next()",
      "A typeof check",
      "Nothing"
     ],
     "a": 1,
     "e": "123 is truthy, so it slips through."
    },
    {
     "c": "Validation",
     "q": "The frontend form already validates. Why validate on the server too?",
     "o": [
      "The server is faster",
      "HTTP requires it",
      "Requests can come from anywhere, not just your form"
     ],
     "a": 2,
     "e": "Never trust that input came from your own page."
    }
   ],
   "ch": "Validate POST and PATCH on tasks.",
   "rf": "Why 400 not 500?"
  },
  "17": {
   "s": [
    [
     "Why environment variables?",
     "<p><b>Configuration</b> is anything that changes between machines or stages: the port, a database URL, an API key. If you write it in your code, you must edit code to deploy, and any <b>secret</b> (a key that grants access) is exposed to everyone who sees the repository. An <b>environment variable</b> is a named value that lives outside your code, in the environment the program runs in. Node reads it from <code>process.env</code>.</p><pre>.env file (not in git)  -- dotenv loads -->  process.env.PORT\ncode in git:  app.listen(process.env.PORT)</pre>"
    ],
    [
     "Environment variables",
     "<p>Config such as ports and keys changes by machine and secrets must stay private. Put them in <code>.env</code> and read from <code>process.env</code>.</p><pre><code>// .env\nPORT=4000\n// server.js\nrequire(\"dotenv\").config();\napp.listen(process.env.PORT || 3000);</code></pre><p>Add .env to .gitignore so secrets never reach GitHub.</p>"
    ],
    [
     "Build it step by step",
     "<h4>Step 1: install and create .env</h4><pre><code>npm install dotenv\n# .env\nPORT=4000\nAPI_KEY=abc123\nNODE_ENV=development</code></pre><h4>Step 2: protect it</h4><pre><code># .gitignore\nnode_modules\n.env</code></pre><p>Commit a <code>.env.example</code> with the same names and fake values so teammates know what to create.</p><h4>Step 3: load it first and use it</h4><pre><code>require(\"dotenv\").config();   // first line of server.js\nconst PORT = process.env.PORT || 3000;\napp.listen(PORT, () => console.log(\"Listening on\", PORT));</code></pre><p>The <code>||</code> gives a default when the variable is missing. Every value in process.env is a <b>string</b>: use Number(process.env.PORT) if you need a number.</p>"
    ],
    [
     "Common mistakes",
     "<div class=\"lv bad\"><b>Loading dotenv too late.</b> If config() runs after you read process.env, the values are undefined.</div><div class=\"lv bad\"><b>Committing .env.</b> Once pushed, treat the secret as leaked and replace it.</div><div class=\"lv bad\"><b>Not restarting.</b> .env is read at startup. Changes need a restart (nodemon does not watch .env by default).</div><div class=\"lv bad\"><b>Spaces or quotes.</b> Write PORT=4000, not PORT = \"4000\" unless you know your loader's rules.</div>"
    ]
   ],
   "fill": {
    "code": "process.___.PORT",
    "a": [
     "env"
    ]
   },
   "q": [
    {
     "c": "Environment variables",
     "q": "Which file lists .env so it is not committed?",
     "o": [
      "package.json",
      "server.js",
      ".gitignore"
     ],
     "a": 2,
     "e": "Git skips listed files."
    },
    {
     "c": "Environment variables",
     "q": "Why is a hardcoded API key bad?",
     "o": [
      "It leaks in code",
      "It is slow",
      "Syntax"
     ],
     "a": 0,
     "e": "Anyone reading code sees it."
    },
    {
     "c": "Environment variables",
     "q": "Read a value with...",
     "o": [
      "res.env",
      "process.env",
      "req.env"
     ],
     "a": 1,
     "e": "process.env holds it."
    },
    {
     "c": "Environment variables",
     "q": "You edit .env while the server is running and nothing changes. Why?",
     "o": [
      "Express caches routes",
      "dotenv is broken",
      "Values are read at startup, so restart"
     ],
     "a": 2,
     "e": "process.env is filled once when the program starts."
    },
    {
     "c": "Environment variables",
     "q": "process.env.PORT is 4000. What is its type?",
     "o": [
      "string",
      "number",
      "boolean"
     ],
     "a": 0,
     "e": "Environment variables are always strings."
    }
   ],
   "ch": "Move PORT to .env and load it with dotenv.",
   "rf": "Why keep secrets in .env?"
  },
  "18": {
   "s": [
    [
     "Why asynchronous code?",
     "<p>Node runs your JavaScript on one thread, one thing at a time. Reading a database or calling another server takes time. If the server waited, every other client would be frozen. <b>Asynchronous</b> code starts slow work, lets the server serve others, and resumes when the result arrives. It is like ordering food: you do not stand at the counter blocking the line.</p><p>JavaScript has three styles for the same idea:</p><pre><code>// 1. callback: a function run later\nsetTimeout(() => console.log(\"done\"), 1000);\n// 2. promise: an object for a future value\nfetchTasks().then(tasks => console.log(tasks));\n// 3. async/await: promise code that reads top to bottom\nconst tasks = await fetchTasks();</code></pre>"
    ],
    [
     "Async Express",
     "<p>Slow work (databases, network) is <b>asynchronous</b>: it finishes later. A <b>promise</b> represents a future result. <code>await</code> pauses an <code>async</code> function until the promise resolves.</p><pre><code>app.get(\"/tasks\", async (req, res, next) => {\n  try { res.json(await getTasks()); }\n  catch (err) { next(err); }\n});</code></pre><p>getTasks is your own function that returns a promise. Without try/catch a rejected promise can crash or hang the request.</p>"
    ],
    [
     "Build it step by step",
     "<h4>Step 1: a function that returns a promise</h4><pre><code>const getTasks = () =>\n  new Promise(resolve => setTimeout(() => resolve([{ id: 1, title: \"Study\" }]), 500));</code></pre><p>This pretends to be a database. A <b>promise</b> is either pending, resolved with a value, or rejected with an error.</p><h4>Step 2: use await in a handler</h4><pre><code>app.get(\"/tasks\", async (req, res, next) => {\n  try {\n    const tasks = await getTasks();\n    res.json(tasks);\n  } catch (err) {\n    next(err);\n  }\n});</code></pre><p><code>async</code> marks a function that may use await. <code>await</code> pauses that function, not the server, until the promise settles. If the promise rejects, await throws, and catch passes it to your error handler.</p>"
    ],
    [
     "Common mistakes",
     "<div class=\"lv bad\"><b>Forgetting await.</b> const tasks = getTasks() gives a pending promise. res.json then sends an empty object.</div><div class=\"lv bad\"><b>await in a normal function.</b> It is a syntax error. Mark the function async.</div><div class=\"lv bad\"><b>No try/catch.</b> A rejected promise in Express 4 is unhandled and the request may hang.</div><div class=\"lv bad\"><b>Mixing .then and await</b> in the same function makes code hard to follow. Pick one.</div>"
    ]
   ],
   "fill": {
    "code": "app.get(\"/\", ___ (req, res) => {});",
    "a": [
     "async"
    ]
   },
   "q": [
    {
     "c": "Async Express",
     "q": "await works only inside...",
     "o": [
      "an async function",
      "any function",
      "Router"
     ],
     "a": 0,
     "e": "Mark the function async."
    },
    {
     "c": "Async Express",
     "q": "Async errors need...",
     "o": [
      "return",
      "try/catch and next(err)",
      "nothing"
     ],
     "a": 1,
     "e": "Else they are unhandled."
    },
    {
     "c": "Async Express",
     "q": "A promise is...",
     "o": [
      "a loop",
      "a route",
      "a future result"
     ],
     "a": 2,
     "e": "It resolves later."
    },
    {
     "c": "Async Express",
     "q": "const tasks = getTasks() is written without await, and getTasks returns a promise. What is tasks?",
     "o": [
      "A pending promise",
      "The task array",
      "undefined"
     ],
     "a": 0,
     "e": "Without await you hold the promise itself."
    },
    {
     "c": "Async Express",
     "q": "Why does await not freeze the whole server?",
     "o": [
      "It is instant",
      "It pauses only that function while Node serves others",
      "It runs in the browser"
     ],
     "a": 1,
     "e": "Waiting is non-blocking."
    }
   ],
   "ch": "Make your data functions async and use await in handlers.",
   "rf": "What does await do?"
  },
  "19": {
   "s": [
    [
     "Why structure a project?",
     "<p>A project that works today but is one 800-line file becomes painful tomorrow. Structure means each kind of code has a known home, so you and others can find and change things safely.</p><pre>Request\n  |\nroutes       which URL and method\n  |\ncontrollers  read req, call a service, send res\n  |\nservices     the real work: rules and data\n  |\nResponse</pre><pre>src/\n  routes/       URL to controller\n  controllers/  req and res only\n  services/     business logic and data\n  middleware/   logger, auth, validate\n  config/       env settings\n  utils/        small helpers\n  app.js        builds the Express app\nserver.js       starts it with listen</pre>"
    ],
    [
     "Project structure",
     "<pre>src/\n  routes/       URL to controller\n  controllers/  req and res logic\n  services/     business logic and data\n  middleware/   logger, auth\n  config/       env settings\n  utils/        helpers</pre><p>Each folder has one job, so you know where to look.</p>"
    ],
    [
     "Refactor step by step",
     "<h4>Step 1: move data work into a service</h4><pre><code>// services/taskService.js\nlet tasks = [];\nexports.all = async () => tasks;\nexports.byId = async (id) => tasks.find(t => t.id === id);</code></pre><h4>Step 2: the controller calls the service</h4><pre><code>exports.get = async (req, res, next) => {\n  try {\n    const task = await service.byId(Number(req.params.id));\n    if (!task) return next(new AppError(\"Task not found\", 404));\n    res.json(task);\n  } catch (err) { next(err); }\n};</code></pre><h4>Step 3: config and app/server split</h4><pre><code>// config/index.js\nrequire(\"dotenv\").config();\nmodule.exports = { port: Number(process.env.PORT) || 3000 };\n// server.js\nconst app = require(\"./src/app\");\napp.listen(require(\"./src/config\").port);</code></pre><p>Keeping app.js separate from listen lets tests load the app without opening a port.</p>"
    ],
    [
     "Common mistakes",
     "<div class=\"lv bad\"><b>req and res inside services.</b> Services should not know about HTTP, so they can be reused and tested.</div><div class=\"lv bad\"><b>Too many folders too early.</b> Create a folder when you have code that needs it.</div><div class=\"lv bad\"><b>Circular requires.</b> If a requires b and b requires a, you get an empty object. Keep dependencies flowing one way.</div>"
    ]
   ],
   "fill": {
    "code": "/* services hold ___ logic */",
    "a": [
     "business"
    ]
   },
   "q": [
    {
     "c": "Project structure",
     "q": "Where does data access go?",
     "o": [
      "config",
      "services",
      "routes"
     ],
     "a": 1,
     "e": "Services own data work."
    },
    {
     "c": "Project structure",
     "q": "Where does .env loading go?",
     "o": [
      "routes",
      "utils",
      "config"
     ],
     "a": 2,
     "e": "Settings live in config."
    },
    {
     "c": "Project structure",
     "q": "Why folders?",
     "o": [
      "Clarity",
      "Speed",
      "Required"
     ],
     "a": 0,
     "e": "Easy to navigate."
    },
    {
     "c": "Project structure",
     "q": "Where should code that reads and writes the task data live?",
     "o": [
      "server.js",
      "services",
      "routes"
     ],
     "a": 1,
     "e": "Services own data work and rules."
    },
    {
     "c": "Project structure",
     "q": "Why keep req and res out of services?",
     "o": [
      "Express forbids it",
      "They are slower",
      "So the logic works without HTTP and is easy to test"
     ],
     "a": 2,
     "e": "Services should be reusable."
    }
   ],
   "ch": "Refactor your API into this structure.",
   "rf": "What goes in services vs controllers?"
  },
  "20": {
   "s": [
    [
     "The brief",
     "<p>Build a <b>Books API</b> with no step-by-step guide. You decide the files, names and flow. Use everything from Days 1 to 19.</p><pre>Resource: books { id, title, author, year, available }\nGET    /books            filter with ?author= and ?available=true\nGET    /books/:id\nPOST   /books            validate title (string), year (integer)\nPUT    /books/:id\nPATCH  /books/:id\nDELETE /books/:id\nAlso: logger, JSON errors, 404 for unknown routes,\nPORT from .env, async service layer, routes + controllers</pre>"
    ],
    [
     "Complete REST API",
     "<p>Build a Books API: full CRUD, validation, error handler, PORT from .env, async services, router, controllers. Requirements only. You decide the files and the design.</p>"
    ],
    [
     "Plan before you code",
     "<p>Answer on paper: Which files do I need? What does each file do? What status will each endpoint return on success and on each failure? Where does validation run? What is the build order?</p><div class=\"lv\"><b>Acceptance tests.</b> Your API is done when all pass: list returns 200; unknown id returns 404; create returns 201; missing title returns 400; wrong year type returns 400; delete returns 204 then 404; unknown route returns JSON 404; changing PORT in .env changes the port; ?author= filters.</div>"
    ],
    [
     "Hints, only when stuck",
     "<div class=\"lv\"><b>1.</b> Start with server.js and GET /books returning an array.</div><div class=\"lv\"><b>2.</b> Add one endpoint, test it with curl -i, then continue.</div><div class=\"lv\"><b>3.</b> Reread Day 13 for the CRUD shape, Day 15 for errors, Day 19 for structure. Then write it in your own words.</div>"
    ]
   ],
   "fill": {
    "code": "module.___ = router;",
    "a": [
     "exports"
    ]
   },
   "q": [
    {
     "c": "Complete REST API",
     "q": "Plan first by...",
     "o": [
      "coding immediately",
      "copying",
      "listing endpoints and statuses"
     ],
     "a": 2,
     "e": "Plans prevent rework."
    },
    {
     "c": "Complete REST API",
     "q": "A bug appears. You...",
     "o": [
      "read the error and isolate",
      "rewrite",
      "ignore"
     ],
     "a": 0,
     "e": "Debug systematically."
    },
    {
     "c": "Complete REST API",
     "q": "Validation runs...",
     "o": [
      "nowhere",
      "before logic",
      "after saving"
     ],
     "a": 1,
     "e": "Reject bad input early."
    },
    {
     "c": "Complete REST API",
     "q": "You finished GET /books. What is the best next step?",
     "o": [
      "Write all endpoints, then test",
      "Refactor everything",
      "Test it with curl, then add one more endpoint"
     ],
     "a": 2,
     "e": "Small verified steps."
    },
    {
     "c": "Complete REST API",
     "q": "A POST with year: 'abc' reaches your controller. Which design is wrong?",
     "o": [
      "Validation happens after saving",
      "Validation happens before saving",
      "A 400 is returned"
     ],
     "a": 0,
     "e": "Validate before using or saving input."
    }
   ],
   "ch": "Build the Books API from scratch.",
   "rf": "What was your design and why?"
  },
  "21": {
   "s": [
    [
     "The assessment",
     "<p>Do these without the lessons open, then check yourself.</p><div class=\"lv\"><b>1. Read.</b> What status and body does GET /tasks/abc return?</div><pre><code>app.get(\"/tasks/:id\", (req, res) => {\n  const id = Number(req.params.id);\n  if (Number.isNaN(id)) return res.status(400).json({ message: \"Invalid id\" });\n  res.json({ id });\n});</code></pre><p>Answer: 400 with Invalid id, because Number(\"abc\") is NaN.</p><div class=\"lv\"><b>2. Debug.</b> An async handler calls getTasks() without await and responds with {}. Why?</div><p>Answer: it returned a pending promise. Add await inside a try/catch.</p><div class=\"lv\"><b>3. Design.</b> Choose method, URL and status code to mark a task done. Answer: PATCH /tasks/:id with {done:true}, 200.</div><div class=\"lv\"><b>4. Build.</b> Ship your final API (Books or Tasks) passing every acceptance test from Day 20.</div>"
    ],
    [
     "Final project + assessment",
     "<p><b>What you can now do:</b> read Express code, build routes, use middleware, parse requests, send correct status codes, structure a project, validate input, handle errors, use env variables, write async handlers. This is a beginner foundation, not expert status.</p><pre>Next: SQL, PostgreSQL, Express + PostgreSQL,\nAuthentication, Authorization, Testing, Deployment</pre>"
    ],
    [
     "What you can now do",
     "<div class=\"lv\">Explain how a request travels from client to Express and back. Read and write routes with params, query and body. Choose methods and status codes sensibly. Write, order and debug middleware. Structure a project into routes, controllers, services and config. Validate input and return consistent errors. Keep secrets in environment variables. Write async handlers with await and try/catch. Debug by observing values and checking where they come from.</div>"
    ],
    [
     "Where you stand and what is next",
     "<p><b>Beginner foundation:</b> what this course taught. <b>Intermediate, next:</b> databases, authentication and authorization, testing. <b>Advanced, later:</b> deployment, performance, security hardening, scaling. Finishing 21 days does not make you an expert. It makes you able to read Express code, build small APIs on your own, and keep learning with understanding.</p><pre>Express Foundations\n        |\nSQL Fundamentals\n        |\nPostgreSQL\n        |\nExpress + PostgreSQL\n        |\nAuthentication, then Authorization\n        |\nTesting\n        |\nDeployment\n        |\nProduction Backend Development</pre>"
    ]
   ],
   "fill": {
    "code": "app.___(3000);",
    "a": [
     "listen"
    ]
   },
   "q": [
    {
     "c": "Final project + assessment",
     "q": "Which middleware reads JSON?",
     "o": [
      "express.json()",
      "express.static()",
      "Router"
     ],
     "a": 0,
     "e": "It fills req.body."
    },
    {
     "c": "Final project + assessment",
     "q": "Task id not found: 404 or 500?",
     "o": [
      "201",
      "404",
      "500"
     ],
     "a": 1,
     "e": "Missing resource."
    },
    {
     "c": "Final project + assessment",
     "q": "Where to keep secrets?",
     "o": [
      "code",
      "public",
      ".env"
     ],
     "a": 2,
     "e": "Out of code."
    },
    {
     "c": "Final project + assessment",
     "q": "Which line shows an async error handled correctly?",
     "o": [
      "try { await getTasks() } catch (err) { next(err) }",
      "getTasks()",
      "res.json(getTasks)"
     ],
     "a": 0,
     "e": "await inside try/catch, passing the error on."
    },
    {
     "c": "Final project + assessment",
     "q": "A missing task id should return which pair?",
     "o": [
      "500 with a stack trace",
      "404 with a JSON message",
      "200 with an error text"
     ],
     "a": 1,
     "e": "Not found is 404, in the same JSON shape as your other errors."
    }
   ],
   "ch": "Ship your final API using all 12 skills from the checklist.",
   "rf": "What can you now do, and what will you learn next?"
  }
 },
 "G": [
  [
   "Server",
   "A computer program that waits for requests and answers them.",
   "Our Express app.",
   "A process that listens on a network port and serves responses."
  ],
  [
   "Request",
   "What the client asks for.",
   "GET /tasks.",
   "An HTTP message with method, URL, headers and optional body."
  ],
  [
   "Response",
   "What the server sends back.",
   "res.json(tasks).",
   "An HTTP message with status code, headers and body."
  ],
  [
   "Route",
   "A rule: this method and path run this code.",
   "app.get(\"/tasks\", ...)",
   "A mapping from method and URL pattern to a handler."
  ],
  [
   "Middleware",
   "A function that runs between request and response (Day 8).",
   "Logging, parsing JSON.",
   "A function with access to req, res and next."
  ],
  [
   "API",
   "A way for programs to talk to each other.",
   "Our endpoints.",
   "A defined interface for software interaction."
  ],
  [
   "JSON",
   "Text format for data.",
   "{\"title\":\"Study\"}",
   "JavaScript Object Notation, a data interchange format."
  ],
  [
   "Callback",
   "A function you hand to someone else to call later.",
   "The (req, res) function.",
   "A function passed as an argument and invoked by the receiver."
  ]
 ]
};
