import React, { useState } from "react";
import Consumer from "./consumer";
import Producer from "./producer";

function Login(data) {
    const [visible, setVisible]         = useState(false);
    const [usertype, setType]           = useState(""); // To store type of user: Producer or Consumer
    const [account_details,setDetails]  = useState({}); // To store user details
    
    //Function to Login
    const onConnect = async(e) => 
    {
        e.preventDefault();
        let result;
        if(usertype==="producer")
            result =  await data.data.contract.getProducerDetails(data.data.account); // Fetch producer details
        else
        {
            result = await data.data.contract.getConsumerDetails(data.data.account); // Fetch consumer details
            console.log(result);
        }
        if(result[0]==="")
            window.alert("Please register first");
        else
        {
            account_details["name"] = result[0];
            account_details["bm"]   = parseInt(result[1]);
            account_details["be"]   = parseInt(result[2]);

            if(usertype==="producer")
            {
                account_details["cpu"]  = parseInt(result[4]);
                account_details["pc"]   = parseInt(result[3]);
            }
            else
            {
                account_details["sc"]   = parseInt(result[3]);
                const corr_producer = await data.data.contract.getProducer(data.data.account);
                account_details["corr_producer"] = corr_producer;
            }
            setVisible(true);
        }
        
    }

    const onUserType = (e) => {
        setType(e.target.value);
    }

    return (
        <>
        {visible?
        (
            usertype ==="producer"?
            (
                <>
                    <Producer data = {{data,account_details}}/>
                </>
            ):
            (
                <>
                    <Consumer data = {{data,account_details}} />
                </>
            )
        ):
        (
            <>
            <div class="wrap">
                <div class="forms">
                    <h3>Choose the type of account</h3>
                    <form onSubmit={onConnect}>
                    <div onChange={onUserType}>
                    <br></br>
                    <div class="form-check form_radio"><input type="radio" value="producer" name="usertype" required/>&nbsp;&nbsp;Producer</div>
                    <div class="form-check form_radio"><input type="radio" value="consumer" name="usertype" required/>&nbsp;&nbsp;Consumer</div>
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>
                </form>
                </div>
            </div>
            </>
        )
        }
        </>
    );
}

export default Login;