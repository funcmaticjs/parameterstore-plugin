# parameterstore-plugin
Funcmatic plugin that fetches environment variables from AWS Parameter Store and sets them in ctx.env

### Install 

```
$> npm install --save @funcmaticjs/parameterstore-plugin
```

### Usage

```js
const ParameterStorePlugin = require('@funcmaticjs/parameterstore-plugin')
func.use(new ParameterStorePlugin())
```

### Configuration

#### Environment Variables

**FUNC_PARAMETERSTORE_PATH** 
- Prefix of parameter name. For example if you have two parameters: `/myapp/prod/VAR1=hello` and `/myapp/prod/var2=world` you should set value to be `/myapp/prod/`. Then this plugin will set the following variables in `ctx.env`:
```js
{
  "VAR1": "hello",
  "VAR2": "world
}
```
- Must be available in `ctx.env` or `process.env` when this plugin runs in the **env handler** lifecycle. 


