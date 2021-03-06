/*
Finito.js
Copyright (c) 2011 Jason Stehle

Permission is hereby granted, free of charge, to any person obtaining 
a copy of this software and associated documentation files (the 
"Software"), to deal in the Software without restriction, including 
without limitation the rights to use, copy, modify, merge, publish, 
distribute, sublicense, and/or sell copies of the Software, and to 
permit persons to whom the Software is furnished to do so, subject to 
the following conditions:

The above copyright notice and this permission notice shall be 
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE 
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION 
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION 
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function () {
    var root = this, Finito = {};
    root.Finito = Finito;
    Finito.VERSION = '0.0.3';
    
    //Return the mean of a list
    Finito.average = function (population) {
        var i, sum = 0;
        if (population === null) { return null; }
        if (_.isNumber(population)) { return population; }
        for (i = 0; i < population.length; i++) {
            sum += population[i];
        }
        return sum / population.length;
    };
    
    //Return the difference between the max and min values of a list.
    Finito.range = function (population) {
        if (_.isNumber(population)) { return 0; }
        if (population.length === 0) { return 0; }
        var max = Math.max.apply(Math, population);
        var min = Math.min.apply(Math, population);
        return max - min;
    };
    
    //Return the sum of squared deviations of a list.
    Finito.sumOfSquaredDeviations = function (population) {
        var i, sum = 0, avg = Finito.average(population);
        for (i = 0; i < population.length; i++) {
            sum += Math.pow(population[i] - avg, 2);
        }
        return sum;
    };
    
    //Return the sum of multiplied codeviations of a list.
    Finito.sumOfMultipliedCodeviations = function (population, population2) {
        var i, avg, avg2, sum = 0;
        
        if (_.isArray(population) && _.isArray(population2)) {
            if (population.length !== population2.length) {
                throw new Error("Argument lengths do not match.");
            }
            
            avg = Finito.average(population);
            avg2 = Finito.average(population2);
        
            for (i = 0; i < population.length; i++) {
                sum += ((population[i] - avg) * (population2[i] - avg2));
            }
            
            return sum;
        } else {
            return 0;
        }
    };
    
    //Support function for population and sample variance.
    Finito._variance = function (list, divisor) {
        return Finito.sumOfSquaredDeviations(list) / divisor;
    };
    
    //Return the population variance of a list.
    Finito.populationVariance = function (population) {
        if (_.isNumber(population)) {population = [population]; }
        return Finito._variance(population, population.length);
    };
    
    //Return the population standard deviation of a list.
    Finito.populationStandardDeviation = function (population) {
        return Math.sqrt(Finito.populationVariance(population));
    };
    
    //Return the population covariance of a list.
    Finito.populationCovariance = function (population, population2) {
        if (_.isNumber(population) || _.isNumber(population2)) { return 0; }
        return Finito.sumOfMultipliedCodeviations(population, population2) / population.length;
    };
    
    //Return the (financial) beta of an asset vs. the market.
    Finito.beta = function (asset, market) {
        return Finito.populationCovariance(asset, market) / Finito.populationVariance(market);
    };
    
    //Return the Sharpe Ratio of an asset vs. the risk-free return. Standard deviation argument is optional.
    Finito.sharpeRatio = function (asset, riskFree, standardDeviation) {
        var i, excessReturns = [];
        if (_.isArray(riskFree)) {
            if (asset.length !== riskFree.length) {
                throw new Error("Argument lengths do not match.");
            }
            
            for (i = 0; i < asset.length; i++) {
                excessReturns.push((asset[i] - riskFree[i]));
            }
            
            if (_.isUndefined(standardDeviation)) {
                standardDeviation = Finito.populationStandardDeviation(excessReturns);
            }
            
        } else { //constant risk-free rate
            if (_.isUndefined(standardDeviation)) {
                standardDeviation = Finito.populationStandardDeviation(asset);
            }
        }
        
        return (Finito.average(asset) - Finito.average(riskFree)) / standardDeviation;
    };
    
    //Return the Treynor Ratio of an asset vs. the risk-free return. Beta argument is optional if market returns are supplied.
    Finito.treynorRatio = function (asset, market, riskFree, assetBeta) {
        if (_.isUndefined(assetBeta)) { assetBeta = Finito.beta(asset, market); }
        var assetReturn = Finito.average(asset);
        var riskFreeReturn = Finito.average(riskFree);
        
        return (assetReturn - riskFreeReturn) / assetBeta;
    };
    
    //Return the downside variance against a minimum acceptable return.
    Finito.downsideVariance = function (asset, minimumReturn) {
        var i, sum = 0, diff;
        var avg2 = Finito.average(minimumReturn);
        for (i = 0; i < asset.length; i++) {
            diff = (asset[i] - avg2);
            if (diff < 0) {
                sum += Math.pow(diff, 2);
            }
        }
        return sum / asset.length;
    };
    
    //Return the downside deviation against a minimum acceptable return.
    Finito.downsideDeviation = function (asset, minimumReturn) {
        return Math.sqrt(Finito.downsideVariance(asset, minimumReturn));
    };
    
    //Return the Sortino Ratio of an asset.
    Finito.sortinoRatio = function (asset, riskFree) {
        var assetReturn = Finito.average(asset);
        var riskFreeReturn = Finito.average(riskFree);
        var downsideRisk = Finito.downsideDeviation(asset, riskFree);
        return (assetReturn - riskFreeReturn) / downsideRisk;
    };
    
    //Return the Jensen's Alpha (Measure) of an asset.
    Finito.jensensAlpha = function (asset, market, riskFree, assetBeta) {
        if (_.isUndefined(assetBeta)) { assetBeta = Finito.beta(asset, market); }
        var assetReturn = Finito.average(asset);
        var riskFreeReturn = Finito.average(riskFree);
        var marketReturn = Finito.average(market);
        return assetReturn - (riskFreeReturn + (assetBeta * (marketReturn - riskFreeReturn)));
    };
    
    //Return the sample variance of a list.
    Finito.sampleVariance = function (sample) {
        if (_.isNumber(sample)) { sample = [sample]; }
        return Finito._variance(sample, sample.length - 1);
    };
    
    //Return the sample standard deviation of a list.
    Finito.sampleStandardDeviation = function (sample) {
        return Math.sqrt(Finito.sampleVariance(sample));
    };
    
    //Return the sample covariance of a list.
    Finito.sampleCovariance = function (sample, sample2) {
        if (_.isNumber(sample) || _.isNumber(sample2)) { return 0; }
        return Finito.sumOfMultipliedCodeviations(sample, sample2) / (sample.length - 1);
    };
    
})();