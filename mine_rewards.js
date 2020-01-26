const SHA256=require('crypto-js/sha256');

class transaction{
	constructor(fromAddress,toAdress,amount){
		this.fromAddress=fromAddress;
		this.toAdress=toAdress;
		this.amount=amount;
	}
}

class Block{
	constructor(timestamp,transactions,previousHash=""){
		this.timestamp=timestamp;
		this.transactions=transactions;
		this.previousHash=previousHash;
		this.hash=this.calculateHash();
		this.nonce=0;
	}
	calculateHash(){
			return SHA256(this.index+this.timestamp+this.previousHash+JSON.stringify(this.data)+this.nonce).toString();
	}
	mineblock(difficulty){
		while(this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")){
			this.nonce++;
			 this.hash=this.calculateHash();
		}
		console.log("block mined"+this.hash);
	}
}

class Blockchain{
	constructor(){
		this.chain=[this.createGenesisBlock()];
		this.difficulty=2;
		this.pendingTransactions=[];
		this.miningReward=100;

	}
	createGenesisBlock(){
		return new Block("01/01/2020","100","0");
	}
	
	minePendingBlock(mineRewardAddress){
		let block=new Block(Date.now(),this.pendingTransactions);
		block.mineblock(this.difficulty);
		console.log("mined successfully");
		this.chain.push(block);
		this.pendingTransactions=[
			new transaction(null,mineRewardAddress,this.miningReward)
		];

	}


	createTransaction(transaction){
		this.pendingTransactions.push(transaction);

	}

	getBalanceofAddress(address){
			let  balance=0;

			for(const block of this.chain){
					for(const trans of block.transactions){
						if(trans.fromAddress==address)
							balance-= trans.amount;
						if(trans.toAdress==address)
							balance+=trans.amount;
					}

			}
			return balance;
	}


	
}


let jelwin=new Blockchain();
jelwin.createTransaction(new transaction('address1','address2',100));
jelwin.createTransaction(new transaction('address2','address1',50));
console.log("\n starting the mier");

jelwin.minePendingBlock('address2');

console.log("\nBalance of address1 is ",jelwin.getBalanceofAddress('address2'));
jelwin.minePendingBlock('address2');

console.log("\nBalance of address1 is ",jelwin.getBalanceofAddress('address2'));

