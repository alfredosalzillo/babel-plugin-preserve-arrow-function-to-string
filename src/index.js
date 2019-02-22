import { declare } from '@babel/helper-plugin-utils';

const ignore = Symbol('no-preserve-to-string');
export default declare((api) => {
  api.assertVersion(7);
  const { types: t } = api;
  return {
    name: 'preserve-arrow-function-to-string',
    visitor: {
      ArrowFunctionExpression(
        path,
      ) {
        if (!path.isArrowFunctionExpression()) return;
        if (path.node[ignore]) return;
        const desc = path.toString();
        const id = path.scope.generateUidIdentifier('fn');
        const node = {
          ...path.node,
          [ignore]: true,
        };
        const toString = t.functionExpression(null, [], t.blockStatement([
          t.returnStatement(
            t.stringLiteral(desc),
          ),
        ]));
        const all = t.functionExpression(null, [], t.blockStatement([
          t.variableDeclaration('const', [t.variableDeclarator(id, node)]),
          t.expressionStatement(
            t.assignmentExpression(
              '=',
              t.identifier(`${id.name}.toString`),
              toString,
            ),
          ),
          t.returnStatement(
            id,
          ),
        ]));
        path.replaceWith(t.callExpression(all, []));
      },
    },
  };
});
