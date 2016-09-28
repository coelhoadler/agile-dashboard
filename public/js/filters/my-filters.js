angular.module('agileFilters', [])
.filter('cpf', function() {
  return (value) => value.substring(0, 3) + "." + value.substring(3, 6) + "." + value.substring(6, 9) + "-" + value.substring(9, 11);
})
.filter('rg', function() {
  return (value) => value.substring(0, 2) + "." + value.substring(2, 5) + "." + value.substring(5, 8) + "-" + value.substring(8, 9);
});