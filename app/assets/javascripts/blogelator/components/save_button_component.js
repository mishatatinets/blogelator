(function() {
  "use strict";

  App.SaveButtonComponent = Ember.Component.extend({
    attributeBindings: ['href'],
    classNames: ['save-button'],
    classNameBindings: ['disabled', 'isConfirming:confirm', 'isSaving:saving', 'isSaved:saved', 'isError:error'],
    href: '#',
    isDisabled: false,
    isConfirming: false,
    isSaving: false,
    isSaved: false,
    isError: false,
    tagName: 'a',
    
    click: function(event) {
      if (this.get('isSaving') || this.get('isDisabled')) {
        return false;
      }
      
      if (this.get('confirm')) {
        if (!this.get('isConfirming')) {
          this.set('isConfirming', true);
          return false;
        } else {
          this.set('isConfirming', false);
          if ($(event.target).hasClass('no')) {
            return false;
          }
        }
      }
      
      var defer = Ember.RSVP.defer(),
          self = this;
      
      defer.promise.then(function() {
        if (self && !self.isDestroyed) {
          self.set('isSaved', true);
          self.set('isSaving', false);
        }
        Ember.run.later(function() {
          if (self && !self.isDestroyed) {
            self.set('isSaved', false);
          }
        }, 800);
      }, function() {
        if (self && !self.isDestroyed) {
          self.set('isError', true);
          self.set('isSaving', false);
        }
        Ember.run.later(function() {
          if (self && !self.isDestroyed) {
            self.set('isError', false);
          }
        }, 800);
      });
      
      this.set('isSaving', true);
      this.sendAction('action', defer);
      
      return false;
    },
    
    disabled: function() {
      if (this.get('isSaving') ||
          this.get('isSaved')  ||
          this.get('isError')
      ) {
        return false;
      } else {
        return this.get('isDisabled');
      }
    }.property('isDisabled', 'isSaving', 'isSaved', 'isError')
  });
  
})();
