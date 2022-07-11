let express=require("express");
const { Int32 } = require("mongodb");
let app=express();
app.use(express.json());

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );
   res.header("Access-Control-Expose-Headers","Authorization");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS ,PUT ,PATCH, DELETE,HEAD"
    );    
    next();
});

app.listen(2410, ()=> console.log(`Listening on port 2410 !`));

const MongoClient=require("mongodb").MongoClient;
let ObjectId=require("mongodb").ObjectId;
const url="mongodb://localhost:27017";
const client=new MongoClient(url);
const dbName="record";

const NodeCache=require("node-cache");
const myCache=new NodeCache({stdTTL:100});

app.post("/register",await=(req,res)=>{
    let {email,mobile}=req.body;
    let num=Math.floor(Math.random()*(1326-9021+1)+9021);
    let payload={email:email,mobile:mobile}; 
    myCache.set("otp",num);
    myCache.set("payload",payload);
    res.send({otp:num});
});

app.get("/validateToRegister",function(req,res){
    let otp= myCache.get("otp");
    let payload=myCache.get("payload");
    console.log("payload = ",payload);
    let body=req.body.otp;
    if(otp===body) 
    {
        let obj={
        createdAt: {
          default: Date.now(),
        },
        updatedAt: "DD/MM/YYYY",
        salutation:"",
        fullName: "",
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        nationality: "",
        dob: "",
        country: "",
        city: "",
        loyalityFlag: "",
        gender: "",
        segmentation: [{
          label: "",
          segType: "",
        }],
        address: [{
          address1: "",
          address2: "",
          city: "",
          state: "",
          pincode:"",
          addressType: "",
          defaultAddress: "",
          alias: "",
          map: {
            latitude:0,
            longitude:0,
            address: "",
          },
        }],
        SavedCards: [{
          cardNo:"",
          cardNoMasked: "",
          expiryMonth: "",
          expiryYear:"",
          cardHolderName: "",
          bankCode: "",
          bankName: "",
          cardType: "",
          cardCategory: "",
          cardCategoryImg: "",
          remarks: "",
          active: "",
        }],
        occupation: [],
        incomeBand: "",   
      };
      client.connect(function(err,client){
        const db=client.db(dbName);
        db.collection("accountdata").insertOne(obj,function(err,result){
            if(err)
            {
                console.log(err);
                res.send(err);
            }
            else
            {
            let result1=result;
            let obj1={
                _id:  result1.insertedId ,
                social: {
                  google: {
                    id: "",
                    name: "",
                    given_name:"",
                    family_name: "",
                    picture:"",
                    email: "",
                    email_verified: false,
                    locale:"",
                  },
                  facebook: {
                    id: "",
                    name: "",
                    picture: "",
                    email: "",
                    email_verified: "",
                    locale: "",
                  },
                  twitter: {
                    id: "",
                    picture: "",
                    email:"",
                    email_verified: "",
                    locale: "",
                    access_token:"",
                    refresh_token: "",
                  }
                },
                createdAt: {
                  default: Date.now(),
                },
                updatedAt: "DD/MM/YYYY",
                email: payload.email,
                mobile:payload.mobile,
                password: "",
                passwordOtp:"",
                otpExpiry: "DD/MM/YYYY",
                appType: [""],
                apps: [{
                  appTypeId: "",
                  userRoleId: "",
                  backEndAssets: [""]
                }],
                concessionareCode: [""],
                devices: [{
                  deviceId: "",
                  deviceActive: false
                }],
                token: {},
                partner: {
                  r360: {
                    token:{},
                    status: {
                      membership: {},
                    }
                  }
                },
              };
              client.connect(function(err,client){
                const db=client.db(dbName);
                db.collection("userdata").insertOne(obj1,function(err,result){
                    if(err)
                    {
                        console.log(err);
                        res.send(err);
                    }
                    else
                    {
                        res.send(result.insertedId);
                    }
                });
            });
            }
        });
      });
    }
    else res.send(false);  
  
});

