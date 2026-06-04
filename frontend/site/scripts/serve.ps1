# Simple static file server for testing
$prefix = 'http://localhost:8000/'
$root = (Get-Location).ProviderPath
Write-Host "Starting simple static server on $prefix serving files from $root"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
$listener.Start()
try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $local = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrEmpty($local)) { $local = 'index.html' }
        $filePath = Join-Path $root $local
        if (Test-Path $filePath) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $context.Response.ContentLength64 = $bytes.Length
            switch ([System.IO.Path]::GetExtension($filePath).ToLower()) {
                '.html' { $mime = 'text/html' }
                '.css'  { $mime = 'text/css' }
                '.js'   { $mime = 'application/javascript' }
                '.svg'  { $mime = 'image/svg+xml' }
                '.png'  { $mime = 'image/png' }
                '.jpg'  { $mime = 'image/jpeg' }
                '.jpeg' { $mime = 'image/jpeg' }
                default { $mime = 'application/octet-stream' }
            }
            $context.Response.AddHeader('Content-Type', $mime)
            $context.Response.OutputStream.Write($bytes,0,$bytes.Length)
        } else {
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $context.Response.StatusCode = 404
            $context.Response.ContentLength64 = $msg.Length
            $context.Response.OutputStream.Write($msg,0,$msg.Length)
        }
        $context.Response.OutputStream.Close()
    }
} finally {
    $listener.Stop()
    $listener.Close()
}
