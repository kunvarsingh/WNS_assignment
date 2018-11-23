interface  SignupDetail {    
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;	
    confirmPassword? : string;
    accountType?:string;
    referralUser?:string;
    investorCode?:string;
}

interface  UpdatePassword {    
    
    currentPassword?: string;    
    newPassword? : string;
    confirmNewPassword? : string
   
}

interface LoginDetail {
    email: string;
    password: string;
}

interface ForgotPasswordDetail {
    email: string;
   
}

interface UserEmail {
    email: string
   
}
interface Address {
   
    address:string
}
interface ETHAddress{
	ETHtoken?:string;
	address?:string
}

interface TxHashAddress{
	TxHashAddress:string;
}


interface WithdrawDetail{
    userId?:any;
    fromAddress?:string;
    amount?:any;
    toAddress?:string;
    password?:string
}

interface ContactDetail{
    name?:any;
    subject?:string;
    email?:any;
    message?:string
  
}

interface TokenDetails{
        tokenName?: any, 
        editTokenImage?:any ,
        companyName?: any,
        description?:any ,
        videoLink?:any,
        websiteLink?: any,        
        facebookLink?: any,
        twitterLink?: any,  
        linkedinLink:any,
        team?:any[],
        linkedinname?:any,
        designation?:any,
        image?:any,
        teamid?:any,
        whitePaper?:any
        // country?:any,
        // address1?:any,
        // address2?:any,
        // zipcode?: any,
}

interface Transdata{
  sn:any;
  hash:any;
  value:any;
}

interface SendTokenDetail{
    userId?:any;
    fromAddress?:string;
    amount?:any;
    toAddress?:string;
    password?:string
}