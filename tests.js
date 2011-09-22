$(document).ready(function(){
    
    module ("Average");
    test("Average 1", function() {
        var population = [2, 4, 4, 4, 5, 5, 7, 9];
        equal(Finito.average(population), 5, "Average of 5");
    });
    
    test("Average 2", function() {
        var population = 3;
        equal(Finito.average(population), 3, "Average of 3");
    });
    
    test("Average 3", function() {
        var population = null;
        equal(Finito.average(population), null, "Null average");
    });
    
    test("Average 4", function() {
        var population = [];
        ok(_.isNaN(Finito.average(population)), "Average of NaN");
    });
    
    
    module("Range");
    test("Range 1", function() {
        var population = [2, 4, 4, 4, 5, 5, 7, 9];
        equal(Finito.range(population), 7, "Range of 7");
    });
    
    test("Range 2", function() {
        var population = [2, 4, -4, 4, 7, -5, 5, -2];
        equal(Finito.range(population), 12, "Range of 12");
    });
    
    test("Range 3", function() {
        var population = [];
        equal(Finito.range(population), 0, "Range of 0");
    });
    
    test("Range 4", function() {
        var population = [7];
        equal(Finito.range(population), 0, "Range of 0");
    });
    
    test("Range 5", function() {
        var population = 7;
        equal(Finito.range(population), 0, "Range of 0");
    });
    
    
    module("Sum of squared deviations");
    test("Sum of squared deviations 1", function() {
        var population = [2, 4, 4, 4, 5, 5, 7, 9];
        equal(Finito.sumOfSquaredDeviations(population), 32, "Sum of squared deviations of 32");
    });
    
    test("Sum of squared deviations 2", function() {
        var population = [];
        equal(Finito.sumOfSquaredDeviations(population), 0, "Sum of squared deviations of 0");
    });
    
    test("Sum of squared deviations 3", function() {
        var population = [5];
        equal(Finito.sumOfSquaredDeviations(population), 0, "Sum of squared deviations of 0");
    });
    
    test("Sum of squared deviations 4", function() {
        var population = 7;
        equal(Finito.sumOfSquaredDeviations(population), 0, "Sum of squared deviations of 0");
    });
    
    
    module("Population Variance");
    test("Population Variance 1", function() {
        var population = [2, 4, 4, 4, 5, 5, 7, 9];
        equal(Finito.populationVariance(population), 4, "Population Variance of 4");
    });
    
    test("Population Variance 2", function() {
        var population = [];
        ok(_.isNaN(Finito.populationVariance(population)), "Population Variance of NaN");
    });
    
    test("Population Variance 3", function() {
        var population = [5];
        equal(Finito.populationVariance(population), 0, "Population Variance of 0");
    });
    
    test("Population Variance 4", function() {
        var population = 7;
        equal(Finito.populationVariance(population), 0, "Population Variance of 0");
    });
    
    
    module("Population Standard Deviation");
    test("Population Standard Deviation 1", function() {
        var population = [2, 4, 4, 4, 5, 5, 7, 9];
        equal(Finito.populationStandardDeviation(population), 2, "Population Standard Deviation of 2");
    });
    
    test("Population Standard Deviation 2", function() {
        var population = [];
        ok(_.isNaN(Finito.populationStandardDeviation(population)), "Population Standard Deviation of NaN");
    });
    
    test("Population Standard Deviation 3", function() {
        var population = [5];
        equal(Finito.populationStandardDeviation(population), 0, "Population Standard Deviation of 0");
    });
    
    test("Population Standard Deviation 4", function() {
        var population = 7;
        equal(Finito.populationStandardDeviation(population), 0, "Population Standard Deviation of 0");
    });
    
    
    module("Population Covariance");
    test("Population Covariance 1", function() {
        var population = [2, 4, 4, 4, 5, 5, 7, 9];
        var population2 = [1, 3, 5, 2, 6, 7, 8, 4];
        equal(Finito.populationCovariance(population, population2), 2.375, "Population Covariance of 2.375");
    });
        
    test("Population Covariance 2", function() {
        var population = [2, 4, 4, 4, 5, 5, 7, 9];
        var population2 = 5;
        equal(Finito.populationCovariance(population, population2), 0, "Population Covariance of 0");
        equal(Finito.populationCovariance(population2, population), 0, "Population Covariance of 0");
    });
    
    test("Population Covariance 3", function() {
        var population = [];
        var population2 = [];
        ok(_.isNaN(Finito.populationCovariance(population, population2)), 0, "Population Covariance of NaN");
    });
    
    test("Population Covariance 4", function() {
        var population = [8];
        var population2 = [8];
        equal(Finito.populationCovariance(population, population2), 0, "Population Covariance of 0");
    });
    
    
    module("Beta");
    test("Beta 1", function() {
        var population = [2, 4, 4, 4, 5, 5, 7, 9];
        var population2 = [1, 3, 5, 2, 6, 7, 8, 4];
        var res = Finito.beta(population, population2);
        equal(res.toFixed(5), "0.45238", "Beta of 0.45238");
    });
    
    test("Beta 2", function() {
        var asset = [8,7,1,35,5,7,11,8];
        var market = [7,8,9,7,8,9,8,8];
        var res = Finito.beta(asset, market);
        equal(res.toFixed(5), "-8.75000", "Beta of -8.75000");
    });
    
    
    module("Sharpe Ratio");
    test("Sharpe Ratio 1", function() {
        var asset = [8, 7, 1, -1, -2, 7, 11, -7];
        var riskFree = [3,2,4,3,4,2,2,2];
        var res = Finito.sharpeRatio(asset, riskFree);
        equal(res.toFixed(6), "0.040996", "Sharpe Ratio of 0.040996");
    });
    
    test("Sharpe Ratio 2", function() {
        var asset = [8,7,1,35,5,7,11,8];
        var riskFree = [3,2,4,3,4,2,2,2];
        var res = Finito.sharpeRatio(asset, riskFree);
        equal(res.toFixed(5), "0.76151", "Sharpe Ratio of 0.76151");
    });
    
    test("Sharpe Ratio 3 - Constant risk-free rate", function() {
        var asset = [8,7,1,35,5,7,11,8];
        var riskFree = 2.75;
        var standardDeviation = Finito.populationStandardDeviation(asset);
        var res = Finito.sharpeRatio(asset, riskFree, standardDeviation);
        equal(res.toFixed(5), "0.77075", "Sharpe Ratio of 0.77075");
    });
    
    test("Sharpe Ratio 4 - Constant risk-free rate", function() {
        var asset = [8,7,1,35,5,7,11,8];
        var riskFree = 2.75;
        var res = Finito.sharpeRatio(asset, riskFree);
        equal(res.toFixed(5), "0.77075", "Sharpe Ratio of 0.77075");
    });
    
    test("Sharpe Ratio 5 - Constant risk-free rate", function() {
        var asset = [8,7,1,35,5,7,11,8];
        var riskFree = 2.75;
        var standardDeviation = Finito.populationStandardDeviation(asset);
        var res = Finito.sharpeRatio(Finito.average(asset), riskFree, standardDeviation);

        equal(res.toFixed(5), "0.77075", "Sharpe Ratio of 0.77075");
    });
    
    
    module("Treynor");
    test("Treynor 1", function() {
        var asset = [8,7,1,35,5,7,11,8];
        var market = [7,8,9,7,8,9,8,8];
        var riskFree = [3,2,4,3,4,2,2,2];
        var res = Finito.treynorRatio(asset, market, riskFree);
        
        equal(res.toFixed(5), "-0.85714", "Treynor Ratio of -0.85714");
    });
    
    test("Treynor 2 - Constant risk-free rate", function() {
        var asset = [8,7,1,35,5,7,11,8];
        var market = [7,8,9,7,8,9,8,8];
        var riskFree = 2.75;
        var beta = Finito.beta(asset, market);
        var res = Finito.treynorRatio(asset, market, riskFree, beta);
        
        equal(res.toFixed(5), "-0.85714", "Treynor Ratio of -0.85714");
    });
    
    test("Treynor 3 - Constant risk-free rate", function() {
        var asset = [8,7,1,35,5,7,11,8];
        var market = [7,8,9,7,8,9,8,8];
        var riskFree = 2.75;
        var beta = Finito.beta(asset, market);
        var res = Finito.treynorRatio(Finito.average(asset), null, riskFree, beta);
        
        equal(res.toFixed(5), "-0.85714", "Treynor Ratio of -0.85714");
    });
    

    module("Sample Variance");
    test("Sample Variance 1", function() {
        var population = [2, 4, 4, 4, 5, 5, 7, 9];
        var res = Finito.sampleVariance(population);
        
        equal(res.toFixed(5), "4.57143", "Sample Variance of 4.57143");
    });
    
    
    module("Sample Standard Deviation");
    test("Sample Standard Deviation 1", function() {
        var population = [2, 4, 4, 4, 5, 5, 7, 9];
        var res = Finito.sampleStandardDeviation(population);
        
        equal(res.toFixed(5), "2.13809", "Sample Standard Deviation of 2.13809");
    });
    
    
    module("Sample Covariance");
    test("Sample Covariance 1", function() {
        var population = [2, 4, 4, 4, 5, 5, 7, 9];
        var population2 = [1, 3, 5, 2, 6, 7, 8, 4];
        var res = Finito.sampleCovariance(population, population2);
        
        equal(res.toFixed(5), "2.71429", "Sample Covariance of 2.71429");
    });
    
    

});