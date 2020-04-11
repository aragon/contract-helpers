const MiniMeTokenFactory = await artifacts.require('@aragon/minime/build/contracts/MiniMeTokenFactory')
const MiniMeToken = await artifacts.require('@aragon/minime/build/contracts/MiniMeToken')

async function deployMinimeToken() {
  const factory = await MiniMeTokenFactory.new()
  const token = await MiniMeToken.new(
    factory.address,
    ZERO_ADDRESS,
    0,
    'MiniMe Test Token',
    18,
    'MMT',
    true
  )
  return token
}
