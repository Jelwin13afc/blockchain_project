const SHA256=require('crypto-js/sha256');

class Block{
	constructor(index,timestamp,data,previousHash=""){
		this.index=index;
		this.timestamp=timestamp;
		this.data=data;
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
		this.difficulty=6;

	}
	createGenesisBlock(){
		return new Block(0,"01/01/2020","new block","0");
	}
	getLatestBlock(){
		return this.chain[this.chain.length-1];
	}
	addBlock(newBlock){
		newBlock.previousHash=this.getLatestBlock().hash;
		newBlock.mineblock(this.difficulty);
		this.chain.push(newBlock);
	}

	isChainValid(){
		for(let i=1; i<this.chain.length;i++){
			const currentBlock=this.chain[i];
			const previousBlock=this.chain[i-1];
			if(currentBlock.hash!==currentBlock.calculateHash()){
				return false;
			}
			if(currentBlock.previousHash!==previousBlock.hash){
				return false;
			}
		}
		return true;
	}
}


let jelwin=new Blockchain();
console.log("mining block 1....");
jelwin.addBlock(new Block(1,"2/1/2020",{amount:150}));
console.log("mining block 2....");
jelwin.addBlock(new Block(2,"3/1/2020",{amount:50}));
console.log("mining block 3....");
jelwin.addBlock(new Block(3,"4/1/2020",{amount:520}));
console.log("mining block 4....");
jelwin.addBlock(new Block(4,"5/1/2020",{amount:10}));


