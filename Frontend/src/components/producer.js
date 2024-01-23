import React, { useState } from "react";

function Producer(data)
{
    const[details,setDetails] = useState(data.data.account_details); //Store the producer details
    const[newcpu,setCPU] = useState(0);
    const[visibleCustomers,setVC] = useState(false);
    const[customers,setCustomers] = useState([]);
    const[visibleTransactions,setVT] = useState(false);
    const[transactions,setTransactions] = useState([]);
    
    //Change the Cost Per Unit
    const changeCPU = async () =>
    {
        await data.data.data.data.contract.setCostPerUnit(data.data.data.data.account,newcpu);
        setDetails({cpu:newcpu});
    }

    //Fetch All Customers Subscribed to the Producer
    const getAllConsumers = async () =>
    {
        const result = await data.data.data.data.contract.getAllCustomers(data.data.data.data.account);
        setCustomers(customers.concat(result));
        console.log(result);
        setVC(true);
    }

    const handleCPU = (e) =>
    {
        setCPU(e.target.value);
    }

    //Get all the previous transactions history
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
            <p>Name: {data.data.account_details.name}</p>
            <p>Cost Per Unit: {details.cpu}</p>
            <p>Production Capacity: {data.data.account_details.pc}</p>
            <p>Balance Of Energy: {data.data.account_details.be}</p>
            <p>Balance of Money: {data.data.account_details.bm}</p>
        </div>

        <div class="info_2">
            <h4>Available functionalities</h4>
        </div>
        
        <div class="functionalities">
            <p id="func_head">CHANGE THE COST PER UNIT</p>
            <input type="input" placeholder="Enter new Cost Per Unit" onChange={handleCPU}/>&nbsp;&nbsp;&nbsp;
            <button onClick={changeCPU} class="btn btn-primary">Change Cost Per Unit</button>
        </div>
        
        <div class="functionalities">
            <p id="func_head">GET ALL THE CUSTOMERS</p>
            <button onClick={getAllConsumers} class="btn btn-primary">Get All Consumers</button>
            {
                visibleCustomers?
                (
                <>
                    <div class="info">
                        <p>All the customers</p>
                        {customers.map((element) =>
                        (
                            <p>{element}</p>
                        ))}  
                    </div>
                </>
                ):
                (null)
            }
        </div>
        
        <div class="functionalities">
            <p id="func_head">VIEW ALL THE PREVIOUS TRANSACTIONS</p>
            <button onClick={prevTransactions} class="btn btn-primary">View all the previous transactions</button>
            {
                visibleTransactions?
                (
                <>
                    <div class="info"><p>All the Transactions</p>
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

export default Producer;