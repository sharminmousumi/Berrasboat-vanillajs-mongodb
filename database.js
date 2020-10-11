const { MongoClient, ObjectID } = require('mongodb')
const url = "mongodb+srv://sharmin:bangladeshsweden@cluster0.kef5w.mongodb.net/berra?retryWrites=true&w=majority";

const dbName = 'berra';
const collectionName = 'berrasboat';

//Get 
function get(filter, callback) {
  MongoClient.connect(
    url,
    {  useUnifiedTopology: true },
    async (error,client) => {
      if(error) {
        console.log('error', error.message);

        callback('"ERROR!! Could not connect"');
        return;
      }
      const col = client.db(dbName).collection(collectionName);
      try {
        const cursor = await col.find(filter);
        const array = await cursor.toArray();
        callback(array);
      }catch(error) {
        console.log('Querry error:', error.message);
        callback('"ERROR!! Query error"');

      } finally {
        client.close();
      }
    }
  )
}
//GetObject
function getBoat(id, callback){
	get({_id: new ObjectID(id._id)}, array => callback(array[0]))
}

// Getall object
function getAllBoats(callback) {
	get({}, callback)
}

//Delete object
function deleteBoat(param,callback) {
  console.log('DELETE / deleteBoat')
  const data = {_id: new ObjectID(param._id)};
  MongoClient.connect(
    url,
    {  useUnifiedTopology: true },
    async (error,client) => {
      if(error) {
        callback('"ERROR!! Could not connect"');
        return;
      }
      const col = client.db(dbName).collection(collectionName);
      try {
        const itemToBeDeleted = await col.deleteOne(data);
        callback({itemToBeDeleted:itemToBeDeleted.itemToBeDeleted});
      }catch(error) {
        callback('"ERROR!! Query error"');

      } finally {
        client.close();
      }
    }
  )
}
//search object
function getBoat(id, callback){
	console.log('GET / getBoat')
	get({_id: new ObjectID(id._id)}, array => callback(array[0]))
}

// SEARCH
function search(query, callback){
	const filter = {};

	if( query.word ){
		filter.ModelName={ "$regex": `.*${query.word}.*`,"$options":"i"};
	}
	if( query.maxprice ){
		let price = Number(query.maxprice);
		filter.price = {$lt: price}
	}
	if( query.madebefore ){
		let year = Number(query.madebefore);
		filter.year = {$lt: year}
	}
	if( query.madeafter ){
		let year = Number(query.madeafter);
		filter.year = {$gt: year}
	}

	MongoClient.connect(
		url,
		{ useUnifiedTopology: true },
		async (error, client) => {
			if(error) {
				callback('"Error!! Could not connect"');
				return;  
			}
			const col = client.db(dbName).collection(collectionName);
			try {
				const cursor = await col.find(filter);
				const array = await cursor.toArray()
				callback(array);

			} catch(error) {
				console.log('Query error: ' + error.message);
				callback('"Error!! Query error"');

			} finally {
				client.close();
			}
		}
	)
}

// Add object
function addBoat(requestBody, callback){
  MongoClient.connect(
      url,
      {useUnifiedTopology:true},
      async (error, client)=>{
          if (error){
   -           callback('Error, could not connect');
              return;
          }
          const col=client.db(dbName).collection(collectionName) //collectionobjektet ska man skicka queries till
          try{
              const result=await col.insertOne(requestBody)
              callback({
                  result:result.result,
                  ops:result.ops
              })
          } catch(error){
              console.error('addHat error: '+ error.message)
              callback('Error, query error')
          } finally{
              client.close;
          }
     
      }
  )
  
}



module.exports = {get,getAllBoats,getBoat,deleteBoat,search,addBoat}