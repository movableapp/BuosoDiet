
exports.ids = ['fa','pi','fr','la','co','ve'];

exports.getLabel = function(id) {
    switch (id) {
        case 'fa': return 'Farinacei';
        case 'fr': return 'Frutta';
        case 'la': return 'Latticini';
        case 'pi': return 'Pietanza';
        case 'co': return 'Condimenti';
        case 've': return 'Verdura';
    }
    return id;
};
