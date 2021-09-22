#include <tchar.h>
#include <windows.h>
#include <string>

#define close_btn 0
#define alert_btn 1

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);

TCHAR WinName[] = _T("LAB1");

int APIENTRY _tWinMain(HINSTANCE This,
	HINSTANCE Prev,
	LPTSTR cmd,
	int mode)
{
	HWND hwnd;
	MSG msg;
	WNDCLASS wc;

	wc.hInstance = This;
	wc.lpszClassName = WinName;
	wc.lpfnWndProc = WndProc;
	wc.style = CS_DBLCLKS | CS_HREDRAW | CS_VREDRAW;
	wc.hIcon = LoadIcon(NULL, IDI_ERROR);
	wc.hCursor = LoadCursor(NULL, IDC_CROSS);
	wc.lpszMenuName = NULL;
	wc.cbClsExtra = 0;
	wc.cbWndExtra = 0;
	wc.hbrBackground = (HBRUSH)CreateSolidBrush(RGB(122, 54, 3));

	if (!RegisterClass(&wc)) return 0;

	hwnd = CreateWindow(WinName,
		_T("LAB1"),
		WS_OVERLAPPEDWINDOW | WS_HSCROLL | WS_VSCROLL,
		300,
		300,
		1280,
		720,
		HWND_DESKTOP,
		NULL,
		This,
		NULL);
	ShowWindow(hwnd, mode);

	HWND button_close;
	HWND alert;

	button_close = CreateWindow(_T("button"),
		_T("Close"),
		WS_VISIBLE | WS_CHILD,
		30, 30,
		100, 30,
		hwnd,
		close_btn,
		This,
		NULL);
	alert = CreateWindow(_T("button"),
		_T("Alert"),
		WS_VISIBLE | WS_CHILD,
		230, 30,
		100, 30,
		hwnd,
		(HMENU)alert_btn,
		This,
		NULL);

	while (GetMessage(&msg, NULL, 0, 0))
	{
		TranslateMessage(&msg);
		DispatchMessage(&msg);
	}
}

LRESULT CALLBACK WndProc(HWND hwnd, UINT message, WPARAM wparam, LPARAM lparam)
{
	HDC hdc;
	static unsigned __int8 r = 122, g = 54, b = 3;
	static HBRUSH color = (HBRUSH)CreateSolidBrush(RGB(r, g, b));
	static POINT p;

	switch (message)
	{
	case WM_DESTROY:
		PostQuitMessage(0);
		break;

	case WM_COMMAND:
		switch (wparam)
		{
		case close_btn:
			PostQuitMessage(0);
			break;
		case alert_btn:
			MessageBox(hwnd, _T("Hello"), _T("Hello"), MB_OK);
			break;
		default:
			break;
		}

	case WM_KEYDOWN:

		switch (wparam)
		{
		case VK_ESCAPE:
			PostQuitMessage(0);
			break;

		case VK_LEFT:
			color = (HBRUSH)CreateSolidBrush(RGB(r--, g--, b--));
			InvalidateRect(hwnd, NULL, TRUE);
			break;

		case VK_RIGHT:
			color = (HBRUSH)CreateSolidBrush(RGB(r++, g++, b++));
			InvalidateRect(hwnd, NULL, true);
			break;

		default:
			break;
		}

		break;

	case WM_LBUTTONDOWN:
		GetCursorPos(&p);
		ScreenToClient(hwnd, &p);
		InvalidateRect(hwnd, NULL, TRUE);
		break;

	case WM_PAINT:
		PAINTSTRUCT ps;
		hdc = BeginPaint(hwnd, &ps);

		FillRect(hdc, &ps.rcPaint, color);
		TextOut(hdc, p.x, p.y, _T("click"), 5);

		EndPaint(hwnd, &ps);
		break;

	default:
		return DefWindowProc(hwnd, message, wparam, lparam);
	}

	return 0;
}
