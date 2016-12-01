(function() {
  'use strict';

  angular.module('app.components')
    .controller('BaseModalController', BaseModalController);

  /** @ngInject */
  function BaseModalController($modalInstance, $state, CollectionsApi, EventNotifications) {
    var vm = this;
    vm.cancel = cancel;
    vm.reset = reset;
    vm.save = save;

    function cancel() {
      $modalInstance.dismiss();
    }

    function reset(event) {
      angular.copy(event.original, this.modalData); // eslint-disable-line angular/controller-as-vm
    }

    function save() {
      var vm = this;
      var data = {
        action: vm.action,
        resource: vm.modalData,
      };

      CollectionsApi.post(vm.collection, vm.modalData.id, {}, data).then(saveSuccess, saveFailure);

      function saveSuccess() {
        $modalInstance.close();
        EventNotifications.success(vm.onSuccessMessage);
        $state.go($state.current, {}, {reload: true});
      }

      function saveFailure() {
        EventNotifications.error(vm.onFailureMessage);
      }
    }
  }
})();