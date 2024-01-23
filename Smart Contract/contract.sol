// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.19;
pragma experimental ABIEncoderV2;


contract Smart
{
    // Producer
    struct Producer
    {
        string name;
        uint256 productionCapacity;
        uint256 costPerUnit;
        uint256 balance_money;
        uint256 balance_energy;
    }

    address [] producer_accounts; // To store all the producer accounts
    mapping(address => Producer) producer_details; // To store producer accounts and their details

    // Consumer
    struct Consumer
    {
        string name;
        uint256 StorageCapacity;
        uint256 balance_money;
        uint256 balance_energy;
    }

    // Transaction
    struct Transaction
    {
        address to;
        uint256 money;
        uint256 energy;
    }

    address [] consumer_accounts; // To store all the consumer accounts
    mapping(address => Consumer) consumer_details; // To store consumer accounts and their details

    mapping(address => address) consumer_producer; //To store consumer and their subscribed producer
    mapping(address => address[]) producer_consumer; //To store producers and list of all the subscribed consumers

    mapping(address => Transaction[]) transaction_history; //To store users and all their transactions

    // PRODUCER FUNCTIONS

    // Register a new producer
    function addProducer(address  _acc,string memory _name,uint256 _pc,uint256 _cpu, uint256 _bm,uint256 _be) public returns(address,string memory,uint256,uint256, uint256,uint256,bool)
    {
        producer_accounts.push(_acc);
        producer_details[_acc] = Producer(_name,_pc,_cpu,_bm,_be);
        return (_acc,_name,_pc,_cpu,_bm,_be,true);
    }

    // Fetch all the details of a producer
    function getProducerDetails(address _acc) public view returns(string memory,uint256,uint256, uint256,uint256)
    {
        return (producer_details[_acc].name,producer_details[_acc].balance_money,producer_details[_acc].balance_energy,producer_details[_acc].productionCapacity,producer_details[_acc].costPerUnit);
    }

    // Get all the subscribed customers of a producer
    function getAllCustomers(address _acc) public view returns(address[] memory)
    {
        return producer_consumer[_acc];
    }

    // Set the cost per unit
    function setCostPerUnit(address _acc, uint256 _cpu) public
    {
        producer_details[_acc].costPerUnit = _cpu;
    }
    
    

    //CONSUMER FUNCTIONS

    // Register a new consumer 
    function addConsumer(address  _acc,string memory _name,uint256 _sc,uint256 _bm,uint256 _be) public
    {
        consumer_accounts.push(_acc);
        consumer_details[_acc] = Consumer(_name,_sc,_bm,_be);
    }

    // Fetch all the details of a consumer
    function getConsumerDetails(address _acc) public view returns(string memory,uint256, uint256,uint256)
    {
        return (consumer_details[_acc].name,consumer_details[_acc].balance_money,consumer_details[_acc].balance_energy,consumer_details[_acc].StorageCapacity);
    }

    // Get a list of all the available producers
    function getAllProducers() public view returns(address [] memory)
    {
        return producer_accounts;
    }

    // Subscribe to a producer
    function setProducer(address _acc, address _producerAcc) public
    {
        consumer_producer[_acc] = _producerAcc;
        producer_consumer[_producerAcc].push(_acc);
    }

    // Get the details of the subscribed producer
    function getProducer(address _acc) public view returns(address)
    {
        return consumer_producer[_acc];
    }
    
    // Transfer Money to the producer in order to obtain Energy
    function transferMoneyEnergy(address _consumerAcc, address _producerAcc, uint256 money) public
    {
        producer_details[_producerAcc].balance_money += money;
        consumer_details[_consumerAcc].balance_money -= money;
        uint256 energy = money/(producer_details[_producerAcc].costPerUnit);
        producer_details[_producerAcc].balance_energy -= energy;
        consumer_details[_consumerAcc].balance_energy += energy;
        transaction_history[_consumerAcc].push(Transaction(_producerAcc,money,energy));
        transaction_history[_producerAcc].push(Transaction(_consumerAcc,money,energy));
    }

    //COMMON FUNCTIONS

    // Get the transaction history of the user
    function getHistory(address _acc) public view returns(Transaction[] memory)
    {
        return transaction_history[_acc];
    }

}