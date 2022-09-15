
// code that COULD be used to connect a wallet
// not using because having trouble pulling wallet address

    const checkWallet = () => {
        const { ethereum } = window;

        if (!ethereum) {
            console.log("No wallet found. Please add a wallet.");
            return;
        } else {
            console.log("wallet found.")
        }
     }

    const connectWallet = () => { 
        const { ethereum } = window;

        if (!ethereum) {
            alert("Please Install a wallet from a provider.");
        }
        try {
            const accounts = ethereum.request({ method: 'eth_requestAccounts' });
            console.log("Found an account! Address: ", account);
            setCurrentAccount(account)
            console.log(currentAccount)
        } catch (err) {
            console.log(err)
        }
    } 
