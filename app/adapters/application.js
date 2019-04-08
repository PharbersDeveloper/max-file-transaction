import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
    namespace: "v2", // 根据后端发布版本修改命名空间
});
