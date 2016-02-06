Brandon Murdoch, Argos job app  
==============================  

## What is the task?  
  The task is to:
  * Create a website, that:
    * Calls the HotUkDeals api to get the top 10 products from Argos
    * Calls another api*, and get their prices for the same products
    * Display the products, and their price differences (Where it is better at Argos)  

\* Due to the nature of HUKDs, their is no reliable way to compare product prices, so, I built a 'fake_api' to send me some fake prices for the products.

## instructions
__prerequisites__  
You will need to be able to run cmd on your machine.  
You will need to have node installed.  
If you can't run cmd for whatever reason, I'll provide some screenshots of my service, and you can have a gander over my code.

If you do not have node installed, you can download a portable version from [Here (You want the 'Binary' file)](https://nodejs.org/en/download/). Put the executable in the same folder as this project, and you should be good to go.  
(Change the command from `node app` to `node.exe app` though)


If you cannot get node to work, check out `I_dont_have_node`, which is a html version of an output of my service

---

If you have node installed / have worked with node before:  
`npm install` will save you from having to download the node_modules.

Now, to run my api:  
Open a command window in the project folder (argos_hukd)  
run `node fake_api`

Open another command window in the project folder (argos_hukd)  
run `node app`

Open your favourite browser, and go to `http://localhost:8080/`


Thanks Argos person!
