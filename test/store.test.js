require('dotenv').config()

const ParameterStorePlugin = require('../lib/store')

describe('Request', () => {
  const NOOP = () => { }
  let plugin = null
  beforeEach(async () => {
    plugin = new ParameterStorePlugin()
  })
  afterEach(async () => {
  })
  it ('should NOOP if FUNC_PARAMETERSTORE_PATH not set in ctx.env', async () => {
    let ctx = { env: { } }
    let error = null
    try {
      await plugin.env(ctx, NOOP)
    } catch (err) {
      error = err
    }
    expect(error).toBeFalsy()
    expect(ctx.env).toEqual({ })
  })
  it ('should throw error if path is invalid', async () => {
    let ctx = { env: { FUNC_PARAMETERSTORE_PATH: "/Invalid/Path" } }
    let error = null
    try {
      await plugin.env(ctx, NOOP)
    } catch (err) {
      error = err
    }
    expect(error).toBeTruthy()
    expect(error.message).toEqual(expect.stringContaining("is not authorized to perform"))
  })
  it ('should fetch a valid path', async () => {
    let ctx = { env: { FUNC_PARAMETERSTORE_PATH: "/External/ssmplugin/DEV" } }
    await plugin.env(ctx, NOOP)
    expect(ctx.env).toMatchObject({
      "VARIABLE_A": "value.a",
      "VARIABLE_B": "value.b"
    })
  })
  it ('should also fetch from process.env', async () => {
    process.env['FUNC_PARAMETERSTORE_PATH'] = "/External/ssmplugin/DEV"
    let ctx = { env: { } }
    await plugin.env(ctx, NOOP)
    expect(ctx.env).toMatchObject({
      "VARIABLE_A": "value.a",
      "VARIABLE_B": "value.b"
    })
  })
}) 