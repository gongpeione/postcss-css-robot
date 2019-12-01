let postcss = require('postcss')

let plugin = require('./')

async function run (input, output, opts) {
  let result = await postcss([plugin(opts)]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

it('checkTextTruncationRule', async () => {
  await run(
    'a{ overflow: hidden; padding: 0 0 }',
    'a{ overflow: hidden; padding: 0 0 }',
    {}
  )
  await run(
    'a{ overflow: hidden; padding-bottom: 1px; }',
    'a{ overflow: hidden; padding-bottom: 1px; padding-top: 1px; }',
    {}
  )
  await run(
    'a{ overflow: hidden; }',
    'a{ overflow: hidden; padding-top: 1px; }',
    {}
  )
})
