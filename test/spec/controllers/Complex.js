'use strict';

describe('Controller: ComplexCtrl', function () {

    // load the controller's module
    beforeEach(module('ComplexityApp'));

    var ctrl, myScope, $httpBackend;

    beforeEach(inject(function ($injector, $rootScope, $controller) {
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.expectGET('scripts/data/factories.json').respond([
            {   "id": 0,
                "name": "Solar Power Plant",
                "race": "Boron",
                "amount": 1,
                "product": 0,
                "amount_produced": 5},
            {   "id": 0,
                "name": "BoGas Plant",
                "race": "Paranid",
                "amount": 1,
                "product": 1,
                "amount_produced": 5}
        ]);

        $httpBackend.expectGET('scripts/data/items.json').respond([
            {   "name": "Energy Cell",
                "id": 0},
            {   "name": "BoGas",
                "id": 1}
        ]);

        myScope = $rootScope.$new();
        ctrl = $controller('ComplexCtrl', {
            $scope: myScope
        });
        $httpBackend.flush();
    }));
    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should contain a list of factories', function () {
        expect(myScope.factories.length).toBeDefined();
    });
    it('Should contain a list of items', function () {
        expect(myScope.items.length).toBeDefined();
    });
    it('Should contain a empty list of factories in the complex', function () {
        expect(myScope.complex.length).toBe(0);
    });
    it('Should add a factory to the complex when the addFactory function is called', function () {
        var fact = myScope.factories[0];

        myScope.AddFactoryToComplex(0);

        expect(myScope.complex.length).toBe(1);
        expect(myScope.complex).toContain(fact);
    });
    it('Should increment the original factory when multiple factories are added', function () {
        var fact = myScope.factories[0];

        myScope.AddFactoryToComplex(0);
        myScope.AddFactoryToComplex(0);

        expect(myScope.complex.length).toBe(1);
        expect(myScope.complex[myScope.complex.indexOf(fact)].amount).toBe(2);
    });
    it('Should remove a factory form the complex when the removeFactory function is called', function () {
        var fact = myScope.factories[0];

        myScope.AddFactoryToComplex(0);
        myScope.RemoveFactoryFromComplex(0);

        expect(myScope.complex.length).toBe(0);
        expect(myScope.complex).not.toContain(fact);
    });
    it('Should decrement the original factory amount when a factory is removed when multiple of the same type exist', function () {
        var fact = myScope.factories[0];

        myScope.AddFactoryToComplex(0);
        myScope.AddFactoryToComplex(0);
        myScope.RemoveFactoryFromComplex(0);

        expect(myScope.complex.length).toBe(1);
        expect(myScope.complex[myScope.complex.indexOf(fact)].amount).toBe(1);
    });
    it('Should return an empty array when nothing is in the complex when calculating the complexes product', function () {
        expect(myScope.CaculateComplexProduct().length).toBe(0);
    });
    it('Should return an single item when calculating the complexes product when one factory is in the complex', function () {
        var fact = myScope.factories[0];

        myScope.AddFactoryToComplex(0);

        expect(myScope.CaculateComplexProduct().length).toBe(1);
    });
    it('Should return an single item when calculating the complexes product when two identical factories are in the complex', function () {
        var fact = myScope.factories[0];

        myScope.AddFactoryToComplex(0);
        myScope.AddFactoryToComplex(0);

        expect(myScope.CaculateComplexProduct().length).toBe(1);
    });
    it('Should return the amount produced of a single factory when calculating the prduct of a complex', function () {
        var fact = myScope.factories[0];

        myScope.AddFactoryToComplex(0);

        expect(myScope.CaculateComplexProduct()[0].amount).toBe(5);
    });
    it('Should return multiple items in a complex complex', function () {
        myScope.AddFactoryToComplex(0);
        myScope.AddFactoryToComplex(1);

        expect(myScope.CaculateComplexProduct().length).toBe(2);
    });
    it('Should return an single item when searching for a existing item', function () {
        var item = myScope.FindItemById(0);

        expect(item).toBeDefined();
        expect(item.name).toBe("Energy Cell");
    });
    it('Should return -1 when the item does not exist', function () {
        var item = myScope.FindItemById(9999);

        expect(item).toBe(-1);
    });
    it('Should return an single item when searching for a existing item', function () {
        var item = myScope.FindFactoryById(0);

        expect(item).toBeDefined();
        expect(item.name).toBe("Solar Power Plant");
    });
    it('Should return -1 when the item does not exist', function () {
        var item = myScope.FindFactoryById(9999);

        expect(item).toBe(-1);
    });
});