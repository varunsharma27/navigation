import { VisTypesRegistryProvider } from 'ui/registry/vis_types';
import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { CATEGORY } from 'ui/vis/vis_category';

require('./navigation-controller');
import navigationEditor from 'plugins/navigation/navigation-editor.html';
import navigationTemplate from 'plugins/navigation/navigation.html';

VisTypesRegistryProvider.register(NavigationVisType);

export default function NavigationVisType(Private) {
  const VisFactory = Private(VisFactoryProvider);

  return VisFactory.createAngularVisualization({
    name: 'navigation',
    title: 'Navigation',
    description: 'Dynamic Dashboard Navigator',
    icon: 'fa fa-reorder',
    category: CATEGORY.OTHER,
    visConfig: {
      defaults: {
        order: 'ASC',
        size: 15
      },
      template: navigationTemplate
    },
    editorConfig: {
      ordering: [{
        value: 'ASC',
        text: 'Ascending'
      },
      {
        value: 'DESC',
        text: 'Descending'
      }],
      optionsTemplate: navigationEditor,
    },
    requestHandler: 'none',
    responseHandler: 'none',
    options: {
      showIndexSelection: false,
      showQueryBar: false,
      showFilterBar: false
    }
  });
}
