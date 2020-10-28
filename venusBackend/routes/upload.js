const fs = require('fs');
const multer = require('multer');
const express = require('express');
const router = express.Router()
const cors = require('cors')
const excelToJson = require('convert-excel-to-json');
router.use(cors())
const Profile = require('../model/Profile')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null,  file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
});
const upload = multer({storage: storage});
 
// -> Express Upload RestAPIs
router.post('/', upload.single("fileKey"), (req, res) =>{
    importExcelData2MongoDB('public/uploads/' + req.file.filename);
    res.json({
        'msg': 'File uploaded/import successfully!', 'file': req.file
    });
});
function importExcelData2MongoDB(filePath){
    // -> Read Excel File to Json Data
    const excelData = excelToJson({
        sourceFile: filePath,
        sheets:[{
            // Excel Sheet Name
            name: 'data',
 
            // Header Row -> be skipped and will not be present at our result object.
            header:{
               rows: 1
            },
      
            // Mapping columns to keys
            columnToKey: {
                A: 'firstName',
                B: 'lastName',
                C: 'email',
                D: 'gender',
                E: 'dob',
                F: 'city',
                G: 'phone',
                H: 'qualification',
                I: 'specialization',
                J: 'institute',
                K: 'passingYear',
                L: 'type',
                M: 'designation',
                N: 'organization',
                O: 'workExpFrom',
                P: 'workExpTill',
                Q: 'noticePeriod',
                R: 'currentSalary',
                S: 'flag'
                
            }
        }]
    });
 
    // -> Log Excel Data to Console
    console.log(excelData);

     // Insert Json-Object to MongoDB
        Profile.insertMany(excelData.data, (err, res) => {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            
            // db.close();
        }); 
    fs.unlinkSync(filePath);
}
module.exports = router