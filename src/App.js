//import logo from './logo.svg';
import './App.css';
// src/App.js
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCarnets, addCarnet, updateCarnet, deleteCarnet } from './redux/carnetSlice';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';

// function App() {
//   const dispatch = useDispatch();
//   const carnets = useSelector(state => state.carnets.carnets);

//   // State pour ajouter/modifier un carnet
//   const [newCarnet, setNewCarnet] = useState({
//     numero: '',
//     nom: '',
//     prenom: '',
//     adresse: '',
//     photo: ''
//   });
//   const [editingCarnet, setEditingCarnet] = useState(null);

//   // Charger les carnets au démarrage
//   useEffect(() => {
//     dispatch(fetchCarnets());
//   }, [dispatch]);

//   // Ajouter un carnet
//   const handleAddCarnet = () => {
//     dispatch(addCarnet(newCarnet));
//     setNewCarnet({
//       numero: '',
//       nom: '',
//       prenom: '',
//       adresse: '',
//       photo: ''
//     });
//   };

//   // Mettre à jour un carnet
//   const handleUpdateCarnet = () => {
//     if (editingCarnet) {
//       dispatch(updateCarnet(editingCarnet));
//       setEditingCarnet(null); // Réinitialiser le formulaire après modification
//     }
//   };
  
//   // Préparer la modification
//   const handleEdit = (carnet) => {
//     setEditingCarnet(carnet);
//   };

//   return (
//     <div>
//       <h1>Gestion des Carnets d'adresse</h1>

//       {/* Formulaire d'ajout/modification de carnet */}
//       <Paper style={{ padding: '20px', marginBottom: '20px' }}>
//         <TextField
//           label="Numéro"
//           value={editingCarnet ? editingCarnet.numero : newCarnet.numero}
//           onChange={(e) => editingCarnet
//             ? setEditingCarnet({ ...editingCarnet, numero: e.target.value })
//             : setNewCarnet({ ...newCarnet, numero: e.target.value })
//           }
//           style={{ marginRight: '10px' }}
//         />
//         <TextField
//           label="Nom"
//           value={editingCarnet ? editingCarnet.nom : newCarnet.nom}
//           onChange={(e) => editingCarnet
//             ? setEditingCarnet({ ...editingCarnet, nom: e.target.value })
//             : setNewCarnet({ ...newCarnet, nom: e.target.value })
//           }
//           style={{ marginRight: '10px' }}
//         />
        
//         <TextField
//           label="Prénom"
//           value={editingCarnet ? editingCarnet.prenom : newCarnet.prenom}
//           onChange={(e) => editingCarnet
//             ? setEditingCarnet({ ...editingCarnet, prenom: e.target.value })
//             : setNewCarnet({ ...newCarnet, prenom: e.target.value })
//           }
//           style={{ marginRight: '10px' }}
//         />
//         <TextField
//           label="Adresse"
//           value={editingCarnet ? editingCarnet.adresse : newCarnet.adresse}
//           onChange={(e) => editingCarnet
//             ? setEditingCarnet({ ...editingCarnet, adresse: e.target.value })
//             : setNewCarnet({ ...newCarnet, adresse: e.target.value })
//           }
//           style={{ marginRight: '10px' }}
//         />
//         <TextField
//           label="Photo (URL)"
//           value={editingCarnet ? editingCarnet.photo : newCarnet.photo}
//           onChange={(e) => editingCarnet
//             ? setEditingCarnet({ ...editingCarnet, photo: e.target.value })
//             : setNewCarnet({ ...newCarnet, photo: e.target.value })
//           }
//           style={{ marginRight: '10px' }}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={editingCarnet ? handleUpdateCarnet : handleAddCarnet}
//           style={{ marginLeft: '10px' }}
//         >
//           {editingCarnet ? 'Mettre à jour' : 'Ajouter'}
//         </Button>
//       </Paper>

//       {/* Tableau d'affichage des carnets */}
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Numéro</TableCell>
//               <TableCell>Nom</TableCell>
//               <TableCell>Prénom</TableCell>
//               <TableCell>Adresse</TableCell>
//               <TableCell>Photo</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {carnets.map(carnet => (
//               <TableRow key={carnet.id}>
//                 <TableCell>{carnet.numero}</TableCell>
//                 <TableCell>{carnet.nom}</TableCell>
//                 <TableCell>{carnet.prenom}</TableCell>
//                 <TableCell>{carnet.adresse}</TableCell>
//                 <TableCell>
//                   <img src={carnet.photo} alt={carnet.nom} style={{ width: '50px' }} />
//                 </TableCell>
//                 <TableCell>
//                   <Button onClick={() => handleEdit(carnet)} variant="contained" color="primary" style={{ marginRight: '10px' }}>
//                     Modifier
//                   </Button>
//                   <Button onClick={() => dispatch(deleteCarnet(carnet.id))} variant="contained" color="secondary">
//                     Supprimer
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// }

// export default App;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarnets, addCarnet, updateCarnet, deleteCarnet } from './redux/carnetSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';

function App() {
  const dispatch = useDispatch();
  const carnets = useSelector(state => state.carnets.carnets);

  const [newCarnet, setNewCarnet] = useState({
    numero: '',
    nom: '',
    prenom: '',
    adresse: '',
    photo: ''
  });
  const [editingCarnet, setEditingCarnet] = useState(null);

  useEffect(() => {
    dispatch(fetchCarnets());
  }, [dispatch]);

  const handleAddCarnet = () => {
    dispatch(addCarnet(newCarnet)).then(() => {
      dispatch(fetchCarnets()); // Rafraîchir la liste après ajout
      setNewCarnet({
        numero: '',
        nom: '',
        prenom: '',
        adresse: '',
        photo: ''
      });
    });
  };

  const handleUpdateCarnet = () => {
    dispatch(updateCarnet(editingCarnet)).then(() => {
      dispatch(fetchCarnets()); // Rafraîchir la liste après mise à jour
      setEditingCarnet(null);
    });
  };

  const handleDeleteCarnet = (id) => {
    dispatch(deleteCarnet(id)).then(() => {
      dispatch(fetchCarnets()); // Rafraîchir la liste après suppression
    });
  };

  const handleEdit = (carnet) => {
    setEditingCarnet(carnet);
  };

  return (
    <div>
      <h1>Gestion des Carnets d'adresse</h1>

      {/* Formulaire d'ajout/modification d'utilisateur */}
      <Paper style={{ padding: '20px', marginBottom: '20px' }}>
        <TextField
          label="Numéro"
          value={editingCarnet ? editingCarnet.numero : newCarnet.numero}
          onChange={(e) => editingCarnet
            ? setEditingCarnet({ ...editingCarnet, numero: e.target.value })
            : setNewCarnet({ ...newCarnet, numero: e.target.value })
          }
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Nom"
          value={editingCarnet ? editingCarnet.nom : newCarnet.nom}
          onChange={(e) => editingCarnet
            ? setEditingCarnet({ ...editingCarnet, nom: e.target.value })
            : setNewCarnet({ ...newCarnet, nom: e.target.value })
          }
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Prénom"
          value={editingCarnet ? editingCarnet.prenom : newCarnet.prenom}
          onChange={(e) => editingCarnet
            ? setEditingCarnet({ ...editingCarnet, prenom: e.target.value })
            : setNewCarnet({ ...newCarnet, prenom: e.target.value })
          }
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Adresse"
          value={editingCarnet ? editingCarnet.adresse : newCarnet.adresse}
          onChange={(e) => editingCarnet
            ? setEditingCarnet({ ...editingCarnet, adresse: e.target.value })
            : setNewCarnet({ ...newCarnet, adresse: e.target.value })
          }
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Photo (URL)"
          value={editingCarnet ? editingCarnet.photo : newCarnet.photo}
          onChange={(e) => editingCarnet
            ? setEditingCarnet({ ...editingCarnet, photo: e.target.value })
            : setNewCarnet({ ...newCarnet, photo: e.target.value })
          }
          style={{ marginRight: '10px' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={editingCarnet ? handleUpdateCarnet : handleAddCarnet}
          style={{ marginLeft: '10px' }}
        >
          {editingCarnet ? 'Mettre à jour' : 'Ajouter'}
        </Button>
      </Paper>

      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Numéro</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Prénom</TableCell>
              <TableCell>Adresse</TableCell>
              <TableCell>Photo</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carnets.map(carnet => (
              <TableRow key={carnet.id}>
                <TableCell>{carnet.numero}</TableCell>
                <TableCell>{carnet.nom}</TableCell>
                <TableCell>{carnet.prenom}</TableCell>
                <TableCell>{carnet.adresse}</TableCell>
                <TableCell>{carnet.photo}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(carnet)}>Modifier</Button>
                  <Button onClick={() => handleDeleteCarnet(carnet.id)} color="error">Supprimer</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
