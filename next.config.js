/** @type {import('next').NextConfig} */

module.exports = {
    env: {
        wwdr: process.env.wwdr,
        signerCert: process.env.signerCert,
        signerKey: process.env.signerKey
    },
    transpilePackages: ['@mui/x-charts']
};
