'use strict';

describe('Controller: ComplexCtrl', function () {

    // load the controller's module
    beforeEach(module('ComplexityApp'));

    var ctrl, myScope, $httpBackend;
    //Setup angular js dependency injection
    beforeEach(inject(function ($injector, $rootScope, $controller) {
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.expectGET('scripts/data/factories.json').respond([
            {   "id": 0,
                "name": "Solar Power Plant",
                "race": "Boron",
                "amount": 1,
                "product": 0,
                "amount_produced": 5},
            {   "id": 1,
                "name": "BoGas Plant",
                "race": "Paranid",
                "amount": 1,
                "product": 1,
                "amount_produced": 5},
            {   "id": 2,
                "name": "Solar Power Plant",
                "race": "Paranid",
                "amount": 1,
                "product": 0,
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
    //Fail if any of the http requests have stalled for any reason
    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
    // Testing of contollar setup
    it('Should contain a list of factories', function () {
        expect(myScope.factories.length).toBeDefined();
    });
    it('Should contain a list of items', function () {
        expect(myScope.items.length).toBeDefined();
    });
    it('Should contain a empty list of factories in the complex', function () {
        expect(myScope.complex.length).toBe(0);
    });
    //Testing of Add Factory function
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
    //Testing of remove factory method
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
    // Testing of Calculate Complex Product
    it('Should return an empty array when nothing is in the complex when calculating the complexes product', function () {
        expect(myScope.complexProduct.length).toBe(0);
    });
    it('Should return an single item when calculating the complexes product when one factory is in the complex', function () {
        myScope.AddFactoryToComplex(0);

        expect(myScope.complexProduct.length).toBe(1);
    });
    it('Should return an single item when calculating the complexes product when two identical factories are in the complex', function () {

        myScope.AddFactoryToComplex(0);
        myScope.AddFactoryToComplex(0);

        expect(myScope.complexProduct.length).toBe(1);
    });
    it('Should return the amount produced of a single factory when calculating the prduct of a complex', function () {

        myScope.AddFactoryToComplex(0);

        expect(myScope.complexProduct[0].amount).toBe(5);
    });
    it('Should return a single item in when complex contains different factories with the same product', function () {
        myScope.AddFactoryToComplex(0);
        myScope.AddFactoryToComplex(2);

        expect(myScope.complexProduct.length).toBe(1);
        expect(myScope.complexProduct[0].amount).toBe(10);
    });
    it('Should return a single item in when complex contains different factories with the same product', function () {
        myScope.AddFactoryToComplex(0);
        myScope.AddFactoryToComplex(0);

        expect(myScope.complexProduct.length).toBe(1);
        expect(myScope.complexProduct[0].amount).toBe(10);
    });
    it('Should return multiple items in a complex complex', function () {
        myScope.AddFactoryToComplex(0);
        myScope.AddFactoryToComplex(1);

        expect(myScope.complexProduct.length).toBe(2);
    });
    //Testing of Array get methods
    it('Should return an single item when searching for a existing item', function () {
        var item = myScope.FindItemById(0);

        expect(item).toBeDefined();
        expect(item.name).toBe("Energy Cell");
    });
    it('Should return -1 when the item does not exist', function () {
        var item = myScope.FindItemById(9999);

        expect(item).toBe(-1);
    });
    it('Should return an single item when searching for a existing factory', function () {
        var item = myScope.FindFactoryById(0);

        expect(item).toBeDefined();
        expect(item.name).toBe("Solar Power Plant");
    });
    it('Should return -1 when the factory does not exist', function () {
        var item = myScope.FindFactoryById(9999);

        expect(item).toBe(-1);
    });
    //Testing of Check for matching item method
    it('Should return an single item when searching for a existing item in an array', function () {
        var item = {"id": 0};
        var array = [];
        array.push({"item":item});

         var result = myScope.CheckForMatchingItem(array,item);

        expect(result).toBeDefined();
        expect(result).toBe(0);
    });

});