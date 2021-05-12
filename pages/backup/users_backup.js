// export default function getAll () {
//     return (
//         <>
//         {JSON.stringify(users)}
//         </>
//     );
// }

//C:\Users\alcides.arriola\nextjs-galicia\pages\modulo\data\data.json
import customers from '../modulo/data/data.json';

export default function handler(req, res) {
    
    console.log(req);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    return res.json(customers);

    // if (req.method === 'PUT') {
    //     res.status(201).json(customers);
    // }

    // if (req.method === 'GET') {
    //     res.status(200).json(customers);
    // }

    // if (req.method === 'POST') {
    //     res.status(200).json(customers);
    // }

    // if (req.method === 'DELETE') {
    //     res.status(204).json(customers);
    // }

  }