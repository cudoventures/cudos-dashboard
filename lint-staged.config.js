module.exports = {
  '**/*.{ts,tsx}?(x)': () => 'tsc -p tsconfig.json --noEmit'
}
