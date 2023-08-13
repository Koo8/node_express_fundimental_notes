# Node.js fundimentals
* In contrast with vanilaJS which use index.html + js for browser to evaluate our code, Node.js use repl (read, evaluate, print, loop: type node in terminal) and cli excutable (running app in node)
* GLOBALs - NO WINDOWS
    * __dirname 
    * __filename
    * rquire
    * module -- about current module(file)
    * process -- about env
    * setInterval() / setTimeout()
* built-in modules - os, path, fs, HTTP
* for fs module: readFileSync /writeFileSync : only serving one reader /writer; readFile /writeFile callback block can offload the file reading/writing process to anther thread and return to normal process immediately. The callback block approach nesting all callbacks one over another is messy in code (*fs_file_async_approach1*), which was called callback pyramid of doom, usually use async/await promise approach for read/write file, which is from fs.promises module
* npm / npx / -g  / -D / npm init -y / package.json / node-module / .gitignore / package.lock.json / only when dependency packages being installed, a node-modules folder and package.lock.json will be created automatically.
* Event loop - offloading I/O operations to system kernel so that it is non-blocking; 'events' module with on and emit methods for listening and emit events
* async patterns - promises from API needs async/await to handle. Also *fs* module has promises submodule for readFile and writeFile with promise wrapper
* streams - read/write data sequentially: readable, writable, deplux and transform. Stream extends events.emitter class. CreateReadStream, *on* to listen to events, *pipe* to emit event, *error* to catch err


# Build up Server with Express
* app.get() : response.sendFile('index.html') and app.use(express.static('./public)) 304 status code is when no changes detected, so google not reach to server for data
* app.use(express.static('./public')) generate "index.html" if index.html, css and related js file are in public folder. No need to use app.get('/', (req,res)=>res.rendFile(path.resolve....with index.html)) if index.html is also inside public folder
* sending json data : response.json(dataSource)
* sending PRETTY JSON data: set the "secret" property json spaces on the Node app=> app.set('json spaces', 2) => This statement will produce indentation on json content.
* middleware: order is important; use req.query for authorization middleware
* method GET POST PUT DELETE - use Postman for api testing, instead of building the frontend various pages with an input form for each route path is time saving. 
* An api is the backend database interacting logics, a frontend could be on the same server such as MERN projects, or on different server built based on the api end points for data manipulations.
* for POST, two approaches 1. traditional form<actin method> and javaScript <script> with fetch/axio to backend
* for Put and Delete, req.params from url :id is used for finding the exact data. Put is for updating, so req.body should have a value from input field, for this example is 'name'
* folder testing_frontend_public as express.static root for '/' homepage display. All axios.get() done from frontend is fetching from the backend express_get.js. 
* In testing_frontend_public/javascript.html, check how axios is imported using <script> tag
* normalize.css is added for cross-broswer display
* for parsing frontend input field, express needs a middleware *urlencoded*
* for receiving json{} data from user input, express.json() middleware is needed.
* express router => move related routes together to a file, referrence it as a middleware in app.js => put all routes in 'routes' folder
* for MVC file structure -> create 'controllers' folder, put all peopleRouter's callbacks together



