import React, { useState } from "react";

function Consumer(data)
{   
    const[details,setDetails] = useState(data.data.account_details); //To store consumer details
    const[allProducers,setAllProducers]=useState([]);
    const[aPvisible,setaPvisible]=useState(true);
    const[sPvisible,setsPvisible]=useState(true);
    const[subs_producer,setSP] = useState("");
    const[tPvisible,settPvisible]=useState(true);
    const[trans_pa,setTPA] = useState("");
    const[trans_pam,setTPAM] = useState(0);
    const[visibleTransactions,setVT] = useState(false);
    const[transactions,setTransactions] = useState([]);

    //Get the list of all producers
    const handleAllProducers = async () =>
    {
        const result = await data.data.data.data.contract.getAllProducers();
        setAllProducers(result);
        setaPvisible(false);
    }

    const handlesetProducer = async() =>
    {
        setsPvisible(false);
    }
    
    const handleSP = (e) =>
    {
        setSP(e.target.value);
    }

    //Subscribe to a producer
    const handleSubs = async (e) =>
    {
        e.preventDefault();
        await data.data.data.data.contract.setProducer(data.data.data.data.account,subs_producer);
        setDetails({corr_producer:subs_producer});
    }


    const handlesetTransaction = async() =>
    {
        if(parseInt(details.corr_producer) === 0)
            window.alert("Please subscribe to a producer first");
        else 
            settPvisible(false);
    }
    
    const handleTPA = (e) =>
    {
        if(e.target.value !== details.corr_producer)
            window.alert("Input Address doesn't match Subscribed Producer Address");
        else
            setTPA(e.target.value);
    }

    const handleTPT = (e) =>
    {
        if(e.target.value > details.bm)
            window.alert("You do not have that much tokens in your wallet");
        setTPAM(e.target.value);
    }

    //Perform transactions
    const handleTrans = async (e) =>
    {
        e.preventDefault();
        console.log(trans_pa,trans_pam);
        await data.data.data.data.contract.transferMoneyEnergy(data.data.data.data.account,details.corr_producer,trans_pam);
        const result = await data.data.data.data.contract.getConsumerDetails(data.data.data.data.account);
        console.log(result);
        const cp = await data.data.data.data.contract.getProducer(data.data.data.data.account);
        console.log(cp);
        setDetails({name: result[0],bm:parseInt(result[1]),be:parseInt(result[2]),corr_producer:cp,sc:parseInt(result[3])});
        console.log(details);
        
    }

    //Get history of previous transactions
    const prevTransactions = async () =>
    {
        setTransactions([]);
        const result = await data.data.data.data.contract.getHistory(data.data.data.data.account);
        console.log(result);
        setTransactions(result);
        console.log(transactions);
        setVT(true);
    }

    return(
        <>
        <div class="info">
            <p>Name: {details.name}</p>
            <p>Storage Capacity: {details.sc}</p>
            <p>Balance Of Energy: {details.be}</p>
            <p>Balance of Money: {details.bm}</p>
            
            {
                parseInt(details.corr_producer) === 0 ?
                (
                <>
                    <p>No subscribed producer</p>
                </>
                ):
                (
                <>
                    <p>Subscribed Producer: {details.corr_producer}</p>
                </>
                )
            }
        </div>
    
        <div class="info_2">
            <h4>Available functionalities</h4>
        </div>
    
        <div class="functionalities">
            <p id="func_head">GET ALL THE PRODUCERS</p>
            {
                aPvisible?
                ( 
                    <button onClick = {handleAllProducers} class="btn btn-primary">Get all the producers</button>
                ):
                (
                <>
                {
                        allProducers.length === 0 ?
                    (
                        <>
                            <div class="info"><p>No producers</p></div>
                        </>
                    ):
                    (
                        <>
                        <div class="info">
                            <p>All the producers</p>
                            {
                                allProducers.map((element) =>
                                (
                                    <p>{element}</p>
                                ))}
                        </div> 
                        </>
                    )
                }
                </>
                )
            }
        </div>
       
        <div class="functionalities">
            <p id="func_head">SUBSCRIBE TO A PRODUCER</p>
            {
                sPvisible?
                (
                    <button onClick={handlesetProducer} class="btn btn-primary">Subscribe to a producer</button>
                ):
                (
                    <form onSubmit={handleSubs}>
                        <input type="text" placeholder="Enter producer address" onChange={handleSP}></input>&nbsp;&nbsp;&nbsp;
                        <button type="submit" class="btn btn-primary">Subscribe</button>
                    </form>
                )
            }
        </div>
        
        <div class="functionalities">
            <p id="func_head">SEND TOKENS TO THE PRODUCER</p>
            {
                tPvisible?
                (
                    <button onClick={handlesetTransaction} class="btn btn-primary">Send tokens to the producer</button>
                ):
                (
                    <form onSubmit={handleTrans}>
                        <input type="text" placeholder="Enter producer address" onChange={handleTPA}></input>&nbsp;&nbsp;&nbsp;
                        <input type="number" placeholder="Enter tokens" onChange={handleTPT}></input>&nbsp;&nbsp;&nbsp;
                        <button type="submit" class="btn btn-primary">Send</button>
                    </form>
                )
            }
        </div>

        <div class="functionalities">
            <p id="func_head">VIEW ALL THE PREVIOUS TRANSACTIONS</p>
            <button onClick={prevTransactions} class="btn btn-primary">View all the previous transactions</button>
            {
                visibleTransactions?
                (
                <>
                    <div class="info">
                        <p>All the Transactions</p>
                        <table>
                            <tr>
                                <th>Account</th>
                                <th>Money</th>
                                <th>Energy</th>
                            </tr>
                            {
                                transactions.map((element) =>
                                (
                                    <tr>
                                    <td>{element[0]}</td>
                                    <td>{parseInt(element[1])}</td>
                                    <td>{parseInt(element[2])}</td>
                                    </tr>
                                ))
                            }
                        </table>
                    </div>
                </>
                ):
                (null)
            }
        </div>
        </>
    )
}

export default Consumer;