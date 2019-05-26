const awsParamStore = require( 'aws-param-store')

class ParameterStorePlugin {
  
  constructor() { }

  async env(ctx, next) {
    let path = ctx.env.FUNC_PARAMETERSTORE_PATH
    if (!path) throw new Error("Environment variable 'FUNC_PARAMETERSTORE_PATH' has no value in ctx.env")
    let data = await awsParamStore.getParametersByPath(path)
    let env = paramsToHash(path, data)
    Object.assign(ctx.env, env)
    await next()
  }
}

// awsParamStore.getParametersByPath(path) returns data 
// in this format:
// 
// [ { Name: '/Funcmatic/dev/SSMStorePlugin/VARIABLE_A',
//     Type: 'String',
//     Value: 'value-a',
//     Version: 1 },
//   { Name: '/Funcmatic/dev/SSMStorePlugin/VARIABLE_B',
//     Type: 'String',
//     Value: 'value-b',
//     Version: 1 } ]
//
// https://github.com/vandium-io/aws-param-store 
function paramsToHash(path, params) {
  var h = { }
  for (var param of params) {
    var name = param.Name.replace(path, '')
    if (name.startsWith('/')) {
      name = name.substring(1)
    }
    h[name] = param.Value
  }
  return h
}

module.exports = ParameterStorePlugin 

        
    
    