
var state = {
  listItems: []
};


var listBluePrint = (
  '<li>' +
    '<span class="shopping-item js-shopping-item"></span>' +
    '<div class="shopping-item-controls">' +
      '<button class="js-shopping-item-toggle">' +
        '<span class="button-label">check</span>' +
      '</button>' +
      '<button class="js-shopping-item-delete">' +
        '<span class="button-label">delete</span>' +
      '</button>' +
    '</div>' +
  '</li>'
);



function addItem(state, item) {
  state.listItems.push({
    displayName: item,
    checkedOff: false
  });
}

function getItem(state, itemIndex) {
  return state.listItems[itemIndex];
}

function deleteItem(state, itemIndex) {
  state.listItems.splice(itemIndex, 1);
}

function updateItem(state, itemIndex, newStateItems) {
  state.listItems[itemIndex] = newStateItems;
}



function setItem(item, itemId, itemTemplate, data) {
  var element = $(itemTemplate);
  element.find('.js-shopping-item').text(item.displayName);
  if (item.checkedOff) {
    element.find('.js-shopping-item').addClass('shopping-item__checked');
  }
  element.find('.js-shopping-item-toggle')
  element.attr(data, itemId);
  return element;
}

function initializeList(state, element, data) {
  var itemsHTML = state.listItems.map(
    function(item, index) {
      return setItem(item, index, listBluePrint, data);
  });
  element.html(itemsHTML);
}




function handleItemAdds(
  formElement, identifier, data, element, state) {

  formElement.submit(function(event) {
    event.preventDefault();
    var newItem = formElement.find(identifier).val();
    addItem(state, newItem);
    initializeList(state, element, data);
    
    this.reset();
  });
}

function handleItemDeletes(
  formElement, deleteIdentifier, data, element, state) {

  element.on('click', deleteIdentifier, function(event) {
    var itemIndex = parseInt($(this).closest('li').attr(data));
    deleteItem(state, itemIndex);
    initializeList(state, element, data);
  })
}


function handleItemSwitches(
  element, switchIdentifier, data, state) {

  element.on('click', switchIdentifier, function(event) {
    var itemId = $(event.currentTarget.closest('li')).attr(data);
    var oldListItem = getItem(state, itemId);

    updateItem(state, itemId, {
      displayName: oldListItem.displayName,
      checkedOff: !oldListItem.checkedOff
    });
    initializeList(state, element, data)
  });
}


$(function() {
  var formElement = $('#js-shopping-list-form');
  var element = $('.js-shopping-list');


  var identifier = '#js-new-item';


  var deleteIdentifier = '.js-shopping-item-delete';


  var itemData = 'data-list-item-id';


  var switchIdentifier = '.js-shopping-item-toggle'

  handleItemAdds(
    formElement, identifier, itemData, element, state);
  handleItemDeletes(
    formElement, deleteIdentifier, itemData, element, state);
  handleItemSwitches(element, switchIdentifier, itemData, state);
});

