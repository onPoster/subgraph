```
██████╗  ██████╗ ███████╗████████╗███████╗██████╗
██╔══██╗██╔═══██╗██╔════╝╚══██╔══╝██╔════╝██╔══██╗
██████╔╝██║   ██║███████╗   ██║   █████╗  ██████╔╝
██╔═══╝ ██║   ██║╚════██║   ██║   ██╔══╝  ██╔══██╗
██║     ╚██████╔╝███████║   ██║   ███████╗██║  ██║
╚═╝      ╚═════╝ ╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
   _____       __                           __  
  / ___/__  __/ /_  ____ __________ _____  / /_ 
  \__ \/ / / / __ \/ __ `/ ___/ __ `/ __ \/ __ \
 ___/ / /_/ / /_/ / /_/ / /  / /_/ / /_/ / / / /
/____/\__,_/_.___/\__, /_/   \__,_/ .___/_/ /_/ 
                 /____/          /_/            
```

A subgraph to parse a ridiculously simple general purpose social media smart contract.
It takes a string as a parameter and emits that string, along with msg.sender, as an event. That's it.
The subgraph is a JSON parser which enforces a [PIP](https://github.com/ETHPoster/PIP) to be consumed.

The Poster smart contract can be found [here](https://github.com/ETHPoster/contract).