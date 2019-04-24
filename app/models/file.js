import DS from 'ember-data';

export default DS.Model.extend({
    accept: DS.attr('string'),
    describe: DS.attr('string'),
    name: DS.attr('string'),
    uploadtime: DS.attr('string'),
    uuid: DS.attr('string'),
    downcount: DS.attr('number'),
    size: DS.attr('string'),
    type: DS.attr('string'),
});
