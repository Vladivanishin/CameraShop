import React, { useEffect, useMemo, useRef, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import ReactFocusLock from 'react-focus-lock';
import useKeyPress from '../../hooks/use-key-press';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/catalog-process/selectors';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { AppRoute, KeyCode, SEARCH_BAR_COUNT_CAMERAS } from '../../conts';
import SearchItem from '../search-item/search-item';

export default function SearchBar(): JSX.Element {
  const cameras = useAppSelector(getCameras);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCameraIndex, setCurrentCameraIndex] = useState(-1);

  const listRef = useRef(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const upArrow = useKeyPress({ targetKey: KeyCode.ArrowUp });
  const downArrow = useKeyPress({ targetKey: KeyCode.ArrowDown });
  const esc = useKeyPress({targetKey: KeyCode.Esc});

  const searchedCameras = useMemo(() =>
    cameras.filter((camera) =>
      camera.name.toLowerCase().includes(searchQuery.toLowerCase())), [cameras, searchQuery]);

  const isUpArrowPressed = searchQuery && searchedCameras.length && upArrow;
  const isDownArrowPressed = searchQuery && searchedCameras.length && downArrow;
  const isEscPressed = searchQuery && searchedCameras.length && esc;

  useOutsideClick(listRef, () => setSearchQuery(''));

  useEffect(() => {
    if (searchedCameras.length && isUpArrowPressed) {
      setCurrentCameraIndex((prev) => (prev ? prev - 1 : prev));

      if (!currentCameraIndex) {
        inputRef.current?.focus();
        setCurrentCameraIndex(-1);
      }

    } else if (searchedCameras.length && isDownArrowPressed) {
      setCurrentCameraIndex((prev) => (prev < searchedCameras.length - 1 ? prev + 1 : prev));
    }
  }, [isUpArrowPressed, isDownArrowPressed, searchedCameras.length]);

  useEffect(()=> {
    if (searchedCameras.length && isEscPressed) {
      handleResetClick();}
  },[isEscPressed, searchedCameras.length]);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(evt.target.value);
  };

  const handleResetClick = () => {
    setSearchQuery('');
    inputRef.current?.focus();
  };

  const handleInputBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    if (!evt.relatedTarget) {
      handleResetClick();
    }
  };

  const onSearchItemClick = (cameraId: number) => {
    navigate(generatePath(AppRoute.Product, {id: String(cameraId)}));

    setSearchQuery('');
  };

  return (
    <div
      className={clsx('form-search', searchedCameras.length && searchQuery && 'list-opened')}
      ref={listRef}
      tabIndex={-1}
      data-testid="search-form"
    >
      <ReactFocusLock disabled={!searchQuery}>
        <form onSubmit={(evt) => { evt.preventDefault(); }} data-testid='search-bar'>
          <label>
            <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-lens"></use>
            </svg>
            <input
              className="form-search__input"
              type="text"
              autoComplete="off"
              placeholder="Поиск по сайту"
              value={searchQuery}
              onChange={handleChange}
              ref={inputRef}
              onBlur={handleInputBlur}
            />
          </label>
          <ul className={clsx('form-search__select-list', searchedCameras.length > SEARCH_BAR_COUNT_CAMERAS && 'scroller')}>
            {searchedCameras.map((camera, i) => {
              const isCurrent = i === currentCameraIndex;

              return (
                <SearchItem
                  camera={camera}
                  isCurrent={isCurrent}
                  key={camera.id}
                  onClick={onSearchItemClick}
                />
              );
            }
            )}
          </ul>
        </form>
        <button
          className="form-search__reset"
          type="reset"
          onClick={handleResetClick}
        >
          <svg width="10" height="10" aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg><span className="visually-hidden">Сбросить поиск</span>
        </button>
      </ReactFocusLock>
    </div>
  );
}
