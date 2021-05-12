let clients = require('../../modulo/data/data.json');

export default async function handler(req, res) {

    // res.statusCode = 200;
    // res.setHeader("Content-Type", "application/json");
    // return res.json(clients);

    if (req.method === 'PUT') {
      res.status(201).json({});
    }
  
    if (req.method === 'GET') { 
      console.log(req.query.id.length);
      if((req.query.id[0].length) < 7){
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        return res.json(clients);
      }
      else{
        let doc = req.query.id[0]; 
        let client = clients.find(x => x.dni.toString()===doc.toString());
        if(typeof(client) === 'undefined'){ //console.log('typeof');
          return res.status(201).json({});
        }

        if(client.clave.toString() != req.query.id[1].toString()){ //console.log('if');
          return res.status(201).json({});
        }else{ //console.log('else');
          return res.json(client);
        }
        
      }
      
    }
  
    if (req.method === 'POST') {
      let doc = req.body.dni; 
      let client = clients.find(x => x.dni.toString()===doc.toString());
      if(typeof(client) === 'undefined') return res.status(201).json({});
      return res.status(200).json(client);
    }
  
    if (req.method === 'DELETE') {
      res.status(204).json({});
    }
}