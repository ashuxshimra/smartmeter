import React, { useState } from "react";

function Register(data) {
    const [usertype, setType]   = useState("");
    const [name,setName]        = useState("");
    const [pc,setpc]            = useState(0);
    const [cpu,setcpu]          = useState(0);
    const [boe,setboe]          = useState(0);
    const [bom,setbom]          = useState(0);
    const [sc,setsc]            = useState(0);
    
    //Function to register
    const onRegister = async(e) =>
    {
        e.preventDefault();
        if(usertype==="producer")
            await data.data.contract.addProducer(data.data.account,name,pc,cpu,bom,boe).then(()=> {window.alert("Producer added successfully. Please login");});
        else
            await data.data.contract.addConsumer(data.data.account,name,sc,bom,boe).then(()=> {window.alert("Consumer added successfully. Please login");});
    }

    const onUserType = (e) => {
        setType(e.target.value);
    }

    const onName = (e) => {
        setName(e.target.value);
    }

    const onPC = (e) => {
        setpc(e.target.value);
    }

    const onCPU = (e) => {
        setcpu(e.target.value);
    }

    const onboe = (e) => {
        setboe(e.target.value);
    }

    const onbom = (e) => {
        setbom(e.target.value);
    }

    const onsc = (e) => {
        setsc(e.target.value);
    }

    return(
        <>
        {usertype===""?
        (
        <>
             <div class="wrap"><div class="forms">
            <h3>Register as: </h3>
            <br></br>
            <div onChange={onUserType} >
            <div class="form-check form_radio"><input type="radio" value="producer" name="usertype" required/>&nbsp;&nbsp;Producer</div>
            <div class="form-check form_radio"><input type="radio" value="consumer" name="usertype" required/>&nbsp;&nbsp;Consumer</div>
            </div></div></div>
        </>
        ):
        (
            usertype==="producer"?
            (
            <>
            <div class="wrap">
                <div class="forms">
                    <form onSubmit={onRegister}>
                        <div class="form-group"><input type="text" placeholder="Name" onChange={onName}/></div>
                        <div class="form-group"><input type="number" placeholder="Production Capacity" onChange={onPC}/> </div>
                        <div class="form-group"><input type="number" placeholder="Cost Per Unit" onChange={onCPU}/></div>
                        <div class="form-group"><input type="number" placeholder="Balance Money" onChange={onboe}/></div>
                        <div class="form-group"><input type="number" placeholder="Balance Energy" onChange={onbom}/></div>
                        <button type="submit" class="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>
            </>
            ):
            (
            <>
            <div class="wrap">
               <div class="forms">
                    <form onSubmit={onRegister}>
                        <div class="form-group"><input type="text" placeholder="Name" onChange={onName}/></div>
                        <div class="form-group"><input type="number" placeholder="Storage Capacity" onChange={onsc}/></div>
                        <div class="form-group"><input type="number" placeholder="Balance Money" onChange={onboe}/></div>
                        <div class="form-group"><input type="number" placeholder="Balance Energy" onChange={onbom}/></div>
                        <button type="submit" class="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>
            </>
            )
        )
        }
        </>
      );
}

export default Register;