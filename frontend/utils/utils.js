import * as anchor from '@project-serum/anchor';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { TIKTOK_IDL, TIKTOK_PROGRAM_ID } from './const';

export function getProgramInstance(connection, wallet) {
    if (!wallet.publicKey) throw new WalletNotConnectedError();
    
    // Create a provider
    const provider = new anchor.AnchorProvider(
        connection,
        wallet,
        anchor.AnchorProvider.defaultOptions()
    );

    // Get the IDL and program ID
    const idl = TIKTOK_IDL;
    const programId = TIKTOK_PROGRAM_ID;

    // Create a program instance
    const program = new anchor.Program(idl, programId, provider);

    return program;
}
