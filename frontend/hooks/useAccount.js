import { useEffect } from "react";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import {getProgramInstance} from "../utils/utils";
import {SOLANA_HOST} from "../utils/const";

const anchor = require('@project-serum/anchor')
const utf8 = anchor.utils.bytes.utf8
const {BN,web3} = anchor
const {SystemProgram}= web3
const defaultAccounts = {
    tokenProgram:TOKEN_PROGRAM_ID,
    clock:anchor.web3.SYSVAR_CLOCK_PUBKEY,
    systemProgram: SystemProgram.programId
}
const useAccount=()=>{
const wallet = useWallet()
const connection = new anchor.web3.Connection(SOLANA_HOST)
const program = getProgramInstance(connection,wallet)
const signup = async(name,profile)=>{
let [user_pda] = await anchor.web3.PublicKey.findProgramAddressSync(
    [utf8.encode('user'),wallet.publicKey.toBuffer()],
    program.programId,
)
await program.rpc.createUser(name,profile,{
    accounts:{
        user:user_pda,
        authority:wallet.publicKey, ...defaultAccounts,
    },
})
console.log("USER IS SIGNED UP")
}
return {signup}
}
export default useAccount