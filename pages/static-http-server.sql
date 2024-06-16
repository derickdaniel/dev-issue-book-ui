PS C:\Users\deric> fnm env --use-on-cd | Out-String | Invoke-Expression
PS C:\Users\deric> fnm use --install-if-missing 20
npm install http-server

cd H:\Project\cloud\dev-issue-book-ui
npx http-server -p 9090