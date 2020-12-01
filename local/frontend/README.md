# Сборка webpack

## Команды
- **dev:build**: Собрать проект в режиме разработки
- **prod:build**: Собрать проект в режиме производства
- **dev:watch**: Отслеживать и пересобирать проект в режиме разработки
- **prod:watch**: Отслеживать и пересобирать проект в режиме производства
- **dev:server**: Запустить сервер проекта в режиме разработки
- **prod:server**: Запустить сервер проекта в режиме производства

## Начало работы
- Перейти в папку `<папка_проекта>/local/frontend` и прописать в терминале `npm i`;
- При первом запуске произвести сборку в режиме продакшн `npm run prod:build` (для оптимизации `npm run dev:build` переносит картинки только импортированные напрямую в webpack и при этом **не оптимизирует** их);
- Для разработки можно использовать `npm run dev:build` и `npm run dev:watch` (первая - собирает и только, вторая - отслеживает изменения в файлах и пересобирает (аналог `npm run prod:watch`, но этот режим ресурсоемок из-за разных оптимизаций и сжатия для продакшна));
- В сборке присутствует локальный сервер `npm run dev:server` и `npm run prod:server`, требуется использовать вместе с `dev:watch` и `prod:watch` соответственно.

## Оптимизация
Для продакшн режима присутствуют оптимизации изображений, что может значительно увеличить время сборки.
Чтобы отключить оптимизацию изображений требуется в файле `<папка_проекта>/local/frontend/config/plugins.js` закомментировать или удалить следующий участок кода:
```javascript
prodPlugins.push(new ImageMinPlugin({
  test: /.jpe?g$/i,
  plugins: [
    ImageMinMozJpegPlugin({
      quality: 84,
      progressive: true
    }),
    ImageMinJpegReCompressPlugin({
      accurate: true,
      quality: 'high',
      min: 60,
      max: 84,
      progressive: true
    }),
    (new ImageMinGMPlugin()).resize({
      width: 1920
    })
  ]
}));
prodPlugins.push(new ImageMinPlugin({
  test: /.png$/i,
  plugins: [
    (new ImageMinGMPlugin()).resize({
      width: 1920
    }),
    ImageMinAdvPngPlugin({
      optimizationLevel: 4
    })
  ]
}));
prodPlugins.push(new ImageMinPlugin({
  test: /.gif$/i,
  plugins: [
    ImageMinGifsiclePlugin({
      interlaced: true,
      optimizationLevel: 3
    })
  ]
}));
prodPlugins.push(new ImageMinPlugin({
  test: /.svg$/i,
  plugins: [
    ImageMinSvgoPlugin()
  ]
}));
```
Так же оптимизация изображений уменьшает максимальную ширину самих изображений до `1920px`, что может кого-то не устраивать.
Чтобы убрать эту возможность, закомментируйте, удалите, или измените на свою максимальную ширину следующий участок кода в **2-х местах** (для _.jpg_ и _.png_ форматов):
```javascript
(new ImageMinGMPlugin()).resize({
  width: 1920
})
```

## Настройка пути
По умолчанию проект собирается в папку: `<папка_проекта>/local/templates/.default`.
Сделано это для проектов на Bitrix.

Путь настраивается в файле `<папка_проекта>/local/frontend/config/path.js`.

## PS
Не забудьте создать `.gitignore` (или использовать существующий) и добавить папку `node_modules` в игнорируемые.
По умолчанию `.gitignore` не добавлен из-за того, чтобы он не затер существующий.
