from .webview import init_webview
from .editor import init_editor
from .addcards import init_addcards

def init():
    init_webview()
    init_editor()
    init_addcards()
