import { Icon } from '@mdi/react';
import { mdiFileDocument, mdiFile, mdiFolder,  } from '@mdi/js';

export const isWebGL2Available = (): boolean => {
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGL2RenderingContext && canvas.getContext("webgl2"));
  } catch (e) {
    return false;
  }
};

export const getFileIconPath = (type: string | null): string => {
  if (type === null) {
    return mdiFolder;
  }
  if ([".txt"].includes(type)) {
    return mdiFileDocument;
  }
  return mdiFile;
}